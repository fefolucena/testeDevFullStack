<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // List users
    public function index()
    {
        return response()->json(User::all());
    }

    // Create user
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'role_level' => 'required|integer|in:1,2,3'
        ]);

        $data['password'] = Hash::make($data['password']);

        return response()->json(
            User::create($data),
            201
        );
    }

    // Update user
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $data = $request->validate([
            'name' => 'sometimes|string',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'password' => 'sometimes|min:6',
            'role_level' => 'sometimes|integer|in:1,2,3'
        ]);

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        return response()->json($user);
    }

    // Delete user
    public function destroy($id)
    {
        User::destroy($id);

        return response()->json([
            'message' => 'User deleted'
        ]);
    }
}
