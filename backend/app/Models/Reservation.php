<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'apartment_id',
        'guest_name',
        'guest_birth_date',
        'status'
    ];

        
    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function apartment(): BelongsTo {
        return $this->belongsTo(Apartment::class);
    }
}
