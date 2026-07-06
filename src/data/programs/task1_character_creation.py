"""
Character Creation for a Fantasy Adventure Game
-----------------------------------------------
When a new hero joins the game, they receive starting gear based
on their class (Warrior or Mage). Each hero get their own inventory.
"""


def create_character(name, character_class, inventory=[]):
    """
    Creates a new character and equips them with starting gear
    based on their class.
    """
    if character_class == "Warrior":
        inventory.append("Iron Sword")
    elif character_class == "Mage":
        inventory.append("Spellbook")

    return {
        "name": name,
        "character_class": character_class,
        "inventory": inventory,
    }


def describe(character):
    """Returns a readable summary of a character's inventory."""
    items = ", ".join(character["inventory"])
    return f"{character['name']} the {character['character_class']}: [{items}]"


if __name__ == "__main__":
    thorne = create_character("Thorne", "Warrior")
    print(describe(thorne))

    elandor = create_character("Elandor", "Mage")
    print(describe(elandor))
