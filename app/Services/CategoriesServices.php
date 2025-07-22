<?php

namespace App\Services;

use App\Models\Catalogs\Categories;

class CategoriesServices
{
    public function getAllActiveCategories()
    {
        return Categories::where(['active' => true, 'deleted' => false])
                         ->orderBy('id', 'asc')
                         ->get();
    }

    public function store($data)
    {
        $categories = new Categories([
            'name' => $data->name,
            'incoming' => $data->incoming ?? false,
            'outcoming' => $data->outcoming ?? false,
            'active' => true,
            'deleted' => false,
        ]);
        $categories->save();

        return $categories;
    }

    public function update($data, $id)
    {
        $categories = Categories::find($id);
        if ($categories) {
            $categories->name = $data->name;
            $categories->incoming = $data->incoming ?? false;
            $categories->outcoming = $data->outcoming ?? false;
            $categories->save();
            return $categories;
        }
        return null;
    }

    public function destroy($id)
    {
        $category = Categories::find($id);
        if ($category) {
            $category->deleted = true;
            $category->save();
            return true;
        }
        return false;
    }

    public function find($id)
    {
        return Categories::where('deleted', false)->findOrFail($id);
    }
}
