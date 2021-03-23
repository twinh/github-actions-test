<?php

class App2Test extends \PHPUnit\Framework\TestCase
{
    public function testAddApp2()
    {
        $this->assertSame(3, \App2\App2::add(1, 2));
    }

    public function testAddBase()
    {
        $this->assertSame(3, \Base\Base::add(1, 2));
    }

    public function testSubBase()
    {
        $this->assertSame(-1, \Base\Base::sub(1, 2));
    }
}