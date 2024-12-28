<?php
// src/Controller/TestController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class TestController
{
     
    public function number(): Response
    {
     $testJson = [
            "Lev = " => "go develop",
            'What ' => "what a sucker?",
            'Here ' => 'you have a test Jason',
            ', time ' => 'has come',
            ' fuck' => " - fuck",
            'PS' => ["Evgensha", "Semyonov", "Sanych"]
        ];
        $response = new JsonResponse($testJson);
        return $response;
    }
}

