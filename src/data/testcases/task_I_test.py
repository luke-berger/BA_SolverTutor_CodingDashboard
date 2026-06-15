import pytest
from task_I_bug import fibonacci

def test_fibonacci_zero():
    assert fibonacci(0) == 0

def test_fibonacci_one():
    assert fibonacci(1) == 1

def test_fibonacci_seven():
    assert fibonacci(7) == 13