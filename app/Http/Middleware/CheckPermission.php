<?php

namespace App\Http\Middleware;

use App\Traits\HasPermissions;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    use HasPermissions;

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        $excludedRouteNames = [
            'restricted',
            'profile.*',
            'password',
            'logout',
            'login',
            'register',
            'verification.*',
        ];
        if (! $request->user()) {
            return $next($request);
        }
        $routeName = $request->route()?->getName();
        if (!$routeName) {
            return $next($request);
        }
        foreach ($excludedRouteNames as $excluded) {
            if (str($routeName)->is($excluded)) {
                return $next($request);
            }
        }
        $page = $request->path();
        $basePage = explode('/', $page)[0]; // obtiene solo lo primero antes del primer "/"
        $permissionToCheck = $basePage . '.view';

        if (! $this->validatePermission($permissionToCheck, $request->user()->id)) {
            return redirect()->route('restricted');
        }

        return $next($request);
    }
}
