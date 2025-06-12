<?php

namespace App\Services;

use App\Models\Catalogs\JobPositions;

class JobPositionService
{
    public function store($data)
    {
        $jobPosition = new JobPositions([
            'name' => $data->name
        ]);
        $jobPosition->save();
        return $jobPosition;
    }

    public function update($data, $id)
    {
        $jobPosition = JobPositions::find($id);
        $jobPosition->name = $data->name;
        $jobPosition->save();
        return $jobPosition;
    }
}
