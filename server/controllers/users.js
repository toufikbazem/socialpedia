import user from "../models/user.js";
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const User = await user.findById(id);

    res.status(200).json(User);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const User = await user.findById(id);
    const friends = await Promise.all(
      User.freinds.map((friend) => user.findById(friend))
    );
    const formattedFriends = friends.map(
      ({ firstName, lastName, occupation, location, picturePath }) => {
        return { firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    const User = await user.findById(id);
    const friend = await user.findById(friendId);

    if (User.freinds.includes(friendId)) {
      User.freinds = User.freinds.filter((id) => id != friendId);
      friend.freinds = friend.freinds.filter((id) => id != id);
    } else {
      User.freinds.push(friendId);
      friend.freinds.push(id);
    }

    await User.save();
    await friend.save();

    const friends = await Promise.all(
      User.freinds.map((id) => user.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
