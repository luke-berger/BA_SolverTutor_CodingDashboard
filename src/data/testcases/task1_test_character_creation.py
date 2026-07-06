"""
Tests for character creation.
"""

from character_creation import create_character


def test_new_warrior_receives_an_iron_sword():
    """A freshly created warrior should be equipped with an Iron Sword."""
    hero = create_character("Brynn", "Warrior")
    assert "Iron Sword" in hero["inventory"]


def test_no_melee_weapons_for_new_mages():
    """A mage should never end up carrying a warrior's sword."""
    warrior = create_character("Garrick", "Warrior")
    mage = create_character("Isolde", "Mage")

    assert "Iron Sword" not in mage["inventory"]


def test_shared_potion():
    """An item given to one hero should not mysteriously show up in another's bag."""
    hero_one = create_character("Rowan", "Warrior")
    hero_one["inventory"].append("Healing Potion")

    hero_two = create_character("Mira", "Mage")

    assert "Healing Potion" not in hero_two["inventory"]

def test_where_is_my_shield():
    """Providing an explicit inventory should not be ignored or overwritten."""
    hero = create_character("Leon", "Warrior", inventory=["Shield"])
    
    assert "Shield" in hero["inventory"]
