<?php

require dirname(__DIR__) . '/vendor/autoload.php';

wei([
    'redis' => [
        'host' => '127.0.0.1',
        'port' => (int) getenv('REDIS_PORT'),
        'auth' => '',
    ], 
]);

class Test extends \PHPUnit\Framework\TestCase
{
    public function testRedis()
    {
        $redis = wei()->redis;
        
        $redis->set('test', 'value');
        $this->assertSame('value', $redis->get('test'));
        
        $redis->incr('test_incr');
        $this->assertSame('1', $redis->get('test_incr'));

        $redis->incr('test_incr');
        $this->assertSame('2', $redis->get('test_incr'));

        $redis->remove('test');
        $redis->remove('test_incr');
    }
    
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