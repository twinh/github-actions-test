<?php

require dirname(__DIR__) . '/vendor/autoload.php';

class Test extends \PHPUnit\Framework\TestCase
{
    public function testCount()
    {
        $this->assertSame(2, 1 + 1);
    }

    public function testRedis()
    {
        $wei = wei([
           'redis' => [
               'port' => getenv('REDIS_PORT'),
           ]
        ]);

        $redis = $wei->redis;

        $redis->set('a', 'b');
        $this->assertEquals('b', $redis->get('a'));
    }
}