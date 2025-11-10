<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use App\Http\Requests\login\RegisterUserRequest;
use App\Http\Requests\login\LoginUserRequest;
use App\Http\Requests\login\LogoutUserRequest;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController
{
    public function register(RegisterUserRequest $request)
    {
        try{
            $user = User::create($request->validated());
            return response()->json([
                'message' => 'User registered successfully',
                'status' => 'success',
                'code' => 201,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'User not created',
                'status' => 'error',
                'code' => 400,
            ]);
        }
    }

    public function login(LoginUserRequest $request)
    {
        $credentials = $request->validated();
    
        $user = User::where('email', $credentials['email'])->first();
    
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials',
                'status' => 'error',
                'code' => 401,
            ], 401);
        }
    
        $token = $user->createToken('auth_token')->plainTextToken;
    
        return response()->json([
            'message' => 'User logged in successfully',
            'status' => 'success',
            'code' => 200,
            'data' => [
                'user' => $user,
                'token' => $token,
            ],
        ]);
    }

    public function logout(LogoutUserRequest $request)
    {
        $token = $request->user()->currentAccessToken();

        if (!$token) {
            return response()->json([
                'message' => 'Token not found',
                'status' => 'error',
                'code' => 404,
            ]);
        }else{
            $request->user()->currentAccessToken()->delete();
            return response()->json([
                'message' => 'User logged out successfully',
                'status' => 'success',
                'code' => 200,
            ]);
        }

    }
}
