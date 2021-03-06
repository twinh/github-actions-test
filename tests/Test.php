<?php

require dirname(__DIR__) . '/vendor/autoload.php';

class Test extends \PHPUnit\Framework\TestCase
{
    public function testCount()
    {
        $this->assertSame(2, \Gat\Counter::sum(1, 1));
    }

    public function ignoreTestRedis()
    {
        $wei = wei([
            'redis' => [
                'port' => getenv('REDIS_PORT'),
            ],
        ]);

        $redis = $wei->redis;

        $redis->set('a', 'b');
        $this->assertSame('b', $redis->get('a'));

        $redis->set('c', ['a' => 'b']);
        $result = $redis->get('c');
        $this->assertSame(['a' => 'b'], $result);
    }
}