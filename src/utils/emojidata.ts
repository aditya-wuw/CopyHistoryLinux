import { Emojies } from "../types/app.types"

export const symbolEmoticonArray: Emojies[] = [
    // --- Happy/Positive ---
    {
        label: "Basic Smile",
        type: "Text Emoticon",
        emoji: ":)", // The symbol itself is the copyable item
        keywords: [":-)", "happy", "smile", "joy"]
    },
    {
        label: "Big Grin",
        type: "Text Emoticon",
        emoji: ":D",
        keywords: [":-D", "=D", "laugh", "big smile"]
    },
    {
        label: "Wink",
        type: "Text Emoticon",
        emoji: ";)",
        keywords: [";-)", "wink", "flirt", "sarcasm"]
    },
    {
        label: "Sticking Out Tongue",
        type: "Text Emoticon",
        emoji: ":P",
        keywords: [":-P", ":p", ":-p", "tongue", "silly", "playful"]
    },
    {
        label: "Kiss",
        type: "Text Emoticon",
        emoji: ":*",
        keywords: [":-*", ":x", "kiss", "smooch", "love"]
    },
    {
        label: "Heart",
        type: "Text Emoticon",
        emoji: "<3",
        keywords: ["heart", "love", "less than three"]
    },

    // --- Neutral/Skeptical ---
    {
        label: "Confused / Sarcastic",
        type: "Text Emoticon",
        emoji: ":/",
        keywords: [":-/", ":\\", ":-\\", "skeptical", "unsure", "annoyed", "uneasy"]
    },
    {
        label: "Neutral Face",
        type: "Text Emoticon",
        emoji: ":|",
        keywords: [":-|", "straight face", "indifferent", "no expression"]
    },
    {
        label: "Surprise / Shock",
        type: "Text Emoticon",
        emoji: ":O",
        keywords: [":-O", ":o", "shock", "surprise", "yell"]
    },

    // --- Negative/Sad ---
    {
        label: "Frown",
        type: "Text Emoticon",
        emoji: ":(",
        keywords: [":-(", "=(", "sad", "frown", "unhappy"]
    },
    {
        label: "Crying",
        type: "Text Emoticon",
        emoji: ":'(",
        keywords: [":'-(", "cry", "tear", "sobbing"]
    },
    {
        label: "Angry / Mad",
        type: "Text Emoticon",
        emoji: ">:(",
        keywords: [">:-(", "mad", "angry", "furious"]
    },

    // --- Other / Special ---
    {
        label: "Shrug",
        type: "Text Emoticon",
        emoji: "¯\\_(ツ)_/¯",
        keywords: ["shrugging", "i don't know", "whatever", "don't care"]
    },
    {
        label: "Look of Disapproval",
        type: "Text Emoticon",
        emoji: "ಠ_ಠ",
        keywords: ["disapproval", "annoyed", "side eye", "stare"]
    },
    {
        label: "Table Flip",
        type: "Text Emoticon",
        emoji: "(╯°□°）╯︵ ┻━┻",
        keywords: ["table flip", "rage", "frustration", "anger"]
    }
];
