"""
Library Branch Management System
-----------------------------------------------
Manages checked-out books across different branches of a public
library network. Each branch tracks its own checkouts.
"""


class LibraryBranch:
    """Represents a single branch of the library system."""

    checked_out_books = []

    def __init__(self, branch_name):
        self.branch_name = branch_name

    def check_out(self, book_title):
        """Checks out a book from this branch."""
        self.checked_out_books.append(book_title)

    def get_checked_out_books(self):
        """Returns the list of books currently checked out from this branch."""
        return self.checked_out_books


if __name__ == "__main__":
    kids_branch = LibraryBranch("Sunnyvale Kids Library")
    downtown_branch = LibraryBranch("Downtown Central Library")

    kids_branch.check_out("Bedtime Stories for Bunnies")
    downtown_branch.check_out("Zombie Apocalypse Survival Guide")

    print(f"{kids_branch.branch_name}: {kids_branch.get_checked_out_books()}")
    print(f"{downtown_branch.branch_name}: {downtown_branch.get_checked_out_books()}")
