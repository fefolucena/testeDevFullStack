<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRoleLevel
{
    public function handle(Request $request, Closure $next, $maxRoleLevel)
    {
        if (auth()->user()->role_level > $maxRoleLevel) {
            return response()->json([
                'message' => 'Access denied'
            ], 403);
        }

        return $next($request);
    }
}
