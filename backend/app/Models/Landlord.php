<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Landlord extends Authenticatable 
{
    use HasFactory;

    protected $fillable = ['name', 'email', 'password'];

    public function apartments(): HasMany {
        return $this->hasMany(Apartment::class);
    }
}
