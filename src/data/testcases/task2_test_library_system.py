"""
Tests for the library branch system.
"""

from library_system import LibraryBranch


def test_new_branch_can_check_out_a_book():
    """Checking out a book at a branch should add it to that branch's list."""
    branch = LibraryBranch("Test Branch")
    branch.check_out("Introduction to Bookkeeping")
    assert "Introduction to Bookkeeping" in branch.get_checked_out_books()


def test_kids_branch_stays_age_appropriate():
    """A kids' branch should never end up with a checkout made at another branch."""
    downtown = LibraryBranch("Downtown Branch")
    downtown.check_out("Zombie Apocalypse Survival Guide")

    kids = LibraryBranch("Kids Branch")

    assert "Zombie Apocalypse Survival Guide" not in kids.get_checked_out_books()


def test_older_branch_does_not_gain_books_from_a_newer_branch():
    """Creating a new branch and checking out a book there should not
    silently add that book to an older, already-existing branch's shelf."""
    riverside = LibraryBranch("Riverside Branch")

    hillside = LibraryBranch("Hillside Branch")
    hillside.check_out("Advanced Dragon Taming")

    assert "Advanced Dragon Taming" not in riverside.get_checked_out_books()

def test_where_are_my_books():
    """A single branch should be able to check out multiple books without clearing its list."""
    branch = LibraryBranch("Central Branch")
    
    branch.check_out("The Hobbit")
    branch.check_out("1984")
    
    checked_books = branch.get_checked_out_books()

    assert "The Hobbit" in checked_books
    assert "1984" in checked_books
