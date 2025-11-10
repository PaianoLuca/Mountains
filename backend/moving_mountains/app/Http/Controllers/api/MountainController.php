<?php

namespace App\Http\Controllers\api;

use App\Models\Mountain;
use App\Http\Requests\mountain\AllMountainsRequest;
use App\Http\Requests\mountain\GetMountainRequest;
use App\Http\Requests\mountain\CreateMountainRequest;
use App\Http\Requests\mountain\EditMountainRequest;
use App\Http\Requests\mountain\RemoveMountainRequest;

use Illuminate\Validation\ValidationException;

class MountainController
{
    public function allMountains(AllMountainsRequest $request)
    {
        $credentials = $request->validated();
        $token = $request->user()->currentAccessToken();
        if (!$token) {
            return response()->json([
                'message' => 'Token not found',
                'status' => 'error',
                'code' => 404,
            ]);
        }

        $mountains = Mountain::all();
        if (!$mountains) {
            return response()->json([
                'message' => 'No mountains found',
                'status' => 'error',
                'code' => 404,
            ]);
        }else{
            return response()->json([
                'message' => 'Mountains found',
                'status' => 'success',
                'code' => 200,
                'data' => $mountains,
            ]);
        }
    }

    public function getMountain(GetMountainRequest $request, $id)
    {
        $credentials = $request->validated();
        $token = $request->user()->currentAccessToken();
        if (!$token) {
            return response()->json([
                'message' => 'Token not found',
                'status' => 'error',
                'code' => 404,
            ]);
        }

        $mountain = Mountain::find($id);
        if (!$mountain) {
            return response()->json([
                'message' => 'Mountain not found',
                'status' => 'error',
                'code' => 404,
            ]); 
        }else{
            return response()->json([
                'message' => 'Mountain found',
                'status' => 'success',
                'code' => 200,
                'data' => $mountain,
            ]);
        }
    }

    public function createMountain(CreateMountainRequest $request)
    {
        try {
            $credentials = $request->validated();
    
            $token = $request->user()->currentAccessToken();
            if (!$token) {
                return response()->json([
                    'message' => 'Token not found',
                    'status' => 'error',
                    'code' => 404,
                ], 404);
            }
    
            $mountain = Mountain::create($credentials);
    
            return response()->json([
                'message' => 'Mountain created',
                'status' => 'success',
                'code' => 201,
                'data' => $mountain,
            ], 201);
    
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'status' => 'error',
                'code' => 422,
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Mountain not created',
                'status' => 'error',
                'code' => 400,
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function editMountain(EditMountainRequest $request, $id)
    {
        try {
            $data = $request->validated();
            $user = $request->user();
    
            if (!$user || !$user->currentAccessToken()) {
                return response()->json([
                    'message' => 'Token not found',
                    'status' => 'error',
                    'code' => 404,
                ], 404);
            }
    
            $mountain = Mountain::find($id);
            if (!$mountain) {
                return response()->json([
                    'message' => 'Mountain not found',
                    'status' => 'error',
                    'code' => 404,
                ], 404);
            }
    
            $mountain->update($data);
    
            return response()->json([
                'message' => 'Mountain updated',
                'status' => 'success',
                'code' => 200,
                'data' => $mountain,
            ], 200);
    
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'status' => 'error',
                'code' => 422,
                'errors' => $e->errors(),
            ], 422);
    
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Mountain not updated',
                'status' => 'error',
                'code' => 400,
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function removeMountain(RemoveMountainRequest $request, $id)
    {
        try {
            $data = $request->validated();
            $user = $request->user();
            if (!$user || !$user->currentAccessToken()) {
                return response()->json([
                    'message' => 'Token not found',
                    'status' => 'error',
                    'code' => 404,
                ], 404);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Mountain not deleted',
                'status' => 'error',
                'code' => 400,
                'error' => $e->getMessage(),
            ], 400);
        }
        $mountain = Mountain::find($id);
        if (!$mountain) {
            return response()->json([
                'message' => 'Mountain not found',
                'status' => 'error',
                'code' => 404,
            ], 404);
        }
        $mountain->delete();
        return response()->json([
            'message' => 'Mountain deleted',
            'status' => 'success',
            'code' => 200,
            'data' => $mountain,
        ], 200);
    }
}
