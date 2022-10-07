const Subscription = require("../../models/users/Subscription");
const User = require("../../models/users/User");
const { createError } = require("../../utils/error");

const createSubscription = async (req, res, next) => {
    const userId = req.params.userId;
    const newSubscription = new Subscription(req.body);

    try {
        const savedSubscription = await newSubscription.save();
        try {
            await User.findByIdAndUpdate(userId, {
                $push: { subscriptions: savedSubscription._id }
            });
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedSubscription);
    } catch (err) {
        next(err)
    }
}

const updateSubscription = async (req, res, next) => {
    try {
        const updatedSubscription = await Subscription.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedSubscription);
    } catch (err) {
        next(err);
    }
}

const deleteSubscription = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        await Subscription.findByIdAndDelete(req.params.id);
        try {
            await User.findByIdAndUpdate(userId, {
                $pull: { subscriptions: req.params.id }
            });
        } catch (err) {
            next(err)
        }
        res.status(200).json("Subscription has been deleted");
    } catch (err) {
        next(err);
    }
}

const getSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(
            req.params.id
        );
        res.status(200).json(subscription);
    } catch (err) {
        next(err);
    }
}

const getSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json(subscriptions);
    } catch (err) {
        next(err);
    }
}

module.exports = { createSubscription, updateSubscription, deleteSubscription, getSubscription, getSubscriptions }