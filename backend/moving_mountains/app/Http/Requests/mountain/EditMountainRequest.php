<?php

namespace App\Http\Requests\mountain;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;

class EditMountainRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'height' => 'required|numeric',
            'description' => 'required|string',
            'image' => 'required|string|max:255',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        return response()->json([
            'message' => 'Validation failed',
            'status' => 'error',
            'code' => 422,
            'errors' => $validator->errors(),
        ], 422);
    }
}
