<?php

class App3Test extends \PHPUnit\Framework\TestCase
{
    public function testAddApp3()
    {
        $this->assertSame(3, \App3\App3::add(1, 2));
    }

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

    public function testSubApp2()
    {
        $this->assertSame(-1, \App2\App2::sub(1, 2));
    }
}