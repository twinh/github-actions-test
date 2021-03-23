<?php

class BaseTest extends \PHPUnit\Framework\TestCase
{
    public function testAdd()
    {
        $this->assertSame(3, \Base\Base::add(1, 2));
    }

    public function testSub()
    {
        $this->assertSame(-1, \Base\Base::sub(1, 2));
    }
}