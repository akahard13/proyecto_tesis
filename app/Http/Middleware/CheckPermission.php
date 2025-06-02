<?php

namespace App\Http\Middleware;

use App\Traits\HasPermissions;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Middleware;

class CheckPermission extends Middleware
{
    use HasPermissions;
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        $excludedRoutes = ['restricted']; 

        if (in_array($request->path(), $excludedRoutes)) {
            return $next($request);
        }
        $page = $request->path();
        $permissionToCheck = $page . '.view';
        if (! $this->validatePermission($permissionToCheck, $request->user()->id)) {
            return redirect()->route('restricted');
        }

        return $next($request);
    }
}
