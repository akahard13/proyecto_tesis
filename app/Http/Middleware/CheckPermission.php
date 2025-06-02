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
        $excludedRouteNames = ['restricted', 'profile', 'password', 'logout', 'login', 'register', 'verification'];
        $routeName = $request->route()->getName();

        $prefix = explode('.', $routeName)[0];
        if (in_array($prefix, $excludedRouteNames)) {
            return $next($request);
        }
        $page = $request->path();
        $permissionToCheck = $page . '.view';
        if (! $this->validatePermission($permissionToCheck, $request->user()->id ?? null)) {
            return redirect()->route('restricted');
        }

        return $next($request);
    }
}
