export const keys = [
	"a", // Facebook
	"b", // Instagram
	"c", // TikTok
	"d", // YouTube
];

export const HomeLayouts = {
	lg: [
		{ i: "a", x: 0, y: 0, w: 1, h: 1, isResizable: false }, // Facebook
		{ i: "b", x: 1, y: 0, w: 1, h: 1, isResizable: false }, // Instagram
		{ i: "c", x: 2, y: 0, w: 1, h: 1, isResizable: false }, // TikTok
		{ i: "d", x: 0, y: 1, w: 2, h: 1, isResizable: false }, // YouTube
	],
	xs: [
		{ i: "a", x: 0, y: 0, w: 1, h: 1, static: true }, // Facebook
		{ i: "b", x: 0, y: 1, w: 1, h: 1, static: true }, // Instagram
		{ i: "c", x: 0, y: 2, w: 1, h: 1, static: true }, // TikTok
		{ i: "d", x: 0, y: 3, w: 1, h: 1, static: true }, // YouTube
	],
};

export const WorkLayouts = {
	lg: [
		{ i: "k", x: 1, y: 5, w: 2, h: 1, isResizable: false },
		{ i: "i", x: 1, y: 0, w: 2, h: 1, isResizable: false },
		{ i: "p", x: 0, y: 2, w: 1, h: 1, isResizable: false },
		{ i: "j", x: 0, y: 6, w: 1, h: 1, isResizable: false },
		{ i: "h", x: 0, y: 4, w: 2, h: 1, isResizable: false },
		{ i: "e", x: 3, y: 4, w: 1, h: 1, isResizable: false },
		{ i: "c", x: 1, y: 1, w: 2, h: 1, isResizable: false },
		{ i: "m", x: 0, y: 3, w: 2, h: 1, isResizable: false },
		{ i: "b", x: 0, y: 4, w: 1, h: 1, isResizable: false },
		{ i: "d", x: 3, y: 4, w: 1, h: 1, isResizable: false },
		{ i: "a", x: 1, y: 6, w: 2, h: 2, isResizable: false },
		{ i: "l", x: 0, y: 1, w: 1, h: 1, isResizable: false },
		{ i: "f", x: 1, y: 4, w: 1, h: 1, isResizable: false },
		{ i: "n", x: 0, y: 7, w: 1, h: 1, isResizable: false },
		{ i: "o", x: 2, y: 3, w: 1, h: 1, isResizable: false },
		{ i: "g", x: 0, y: 7, w: 1, h: 1, isResizable: false },
		{ i: "q", x: 0, y: 3, w: 2, h: 1, isResizable: false },
	],
	xs: [
		{ i: "b", x: 0, y: 0, w: 2, h: 1, static: true },
		{ i: "i", x: 2, y: 0, w: 1, h: 1, static: true },
		{ i: "g", x: 0, y: 5, w: 1, h: 1, static: true },
		{ i: "c", x: 0, y: 1, w: 1, h: 1, static: true },
		{ i: "h", x: 1, y: 4, w: 1, h: 1, static: true },
		{ i: "f", x: 2, y: 2, w: 1, h: 1, static: true },
		{ i: "j", x: 1, y: 1, w: 2, h: 1, static: true },
		{ i: "e", x: 0, y: 4, w: 2, h: 1, static: true },
		{ i: "k", x: 0, y: 4, w: 1.5, h: 1, static: true },
		{ i: "d", x: 2, y: 4, w: 1.5, h: 1, static: true },
		{ i: "a", x: 2, y: 4, w: 3, h: 1, static: true },
		{ i: "l", x: 2, y: 5, w: 1, h: 1, static: true },
		{ i: "m", x: 2, y: 5, w: 1, h: 1, static: true },
		{ i: "n", x: 2, y: 5, w: 1, h: 1, static: true },
	],
};

export const ContactLayouts = {
	lg: [
		{ i: "l", x: 0, y: 3, w: 1, h: 1, isResizable: false },
		{ i: "i", x: 2, y: 5, w: 2, h: 1, isResizable: false },
		{ i: "g", x: 0, y: 0, w: 2, h: 1, isResizable: false },
		{ i: "c", x: 3, y: 1, w: 1, h: 1, isResizable: false },
		{ i: "d", x: 3, y: 0, w: 1, h: 1, isResizable: false },
		{ i: "f", x: 0, y: 1, w: 1, h: 1, isResizable: false },
		{ i: "j", x: 0, y: 4, w: 1, h: 1, isResizable: false },
		{ i: "e", x: 1, y: 1, w: 1, h: 1, isResizable: false },
		{ i: "a", x: 3, y: 2, w: 2, h: 2, isResizable: false },
		{ i: "b", x: 2, y: 1, w: 1, h: 1, isResizable: false },
		{ i: "h", x: 0, y: 5, w: 2, h: 1, isResizable: false },
		{ i: "k", x: 0, y: 2, w: 2, h: 1, isResizable: false },
		{ i: "m", x: 1, y: 2, w: 2, h: 2, isResizable: false },
		{ i: "n", x: 1, y: 2, w: 2, h: 2, isResizable: false },
		{ i: "o", x: 1, y: 6, w: 1, h: 1, isResizable: false },
		{ i: "p", x: 0, y: 5, w: 1, h: 1, isResizable: false },
		{ i: "g", x: 0, y: 7, w: 1, h: 1, isResizable: false },
		{ i: "q", x: 0, y: 3, w: 2, h: 1, isResizable: false },
	],
	xs: [
		{ i: "l", x: 0, y: 0, w: 2, h: 1, static: true },
		{ i: "i", x: 2, y: 0, w: 1, h: 1, static: true },
		{ i: "g", x: 0, y: 0, w: 1, h: 1, static: true },
		{ i: "c", x: 0, y: 1, w: 1, h: 1, static: true },
		{ i: "d", x: 1, y: 1, w: 1, h: 1, static: true },
		{ i: "f", x: 2, y: 1, w: 1, h: 1, static: true },
		{ i: "j", x: 1, y: 1, w: 2, h: 1, static: true },
		{ i: "e", x: 0, y: 3, w: 2, h: 1, static: true },
		{ i: "a", x: 0, y: 4, w: 1.5, h: 1, static: true },
		{ i: "b", x: 2, y: 4, w: 1.5, h: 1, static: true },
		{ i: "h", x: 2, y: 4, w: 3, h: 1, static: true },
		{ i: "k", x: 2, y: 2, w: 1, h: 1, static: true },
		{ i: "m", x: 2, y: 2, w: 1, h: 1, static: true },
		{ i: "n", x: 2, y: 2, w: 1, h: 1, static: true },
	],
};

export const NotesLayouts = {
	lg: [
		{ i: "a", x: 0, y: 2, w: 2, h: 1, isResizable: false },
		{ i: "b", x: 0, y: 2, w: 1, h: 1, isResizable: false },
		{ i: "c", x: 2, y: 0, w: 1, h: 1, isResizable: false },
		{ i: "d", x: 0, y: 1, w: 1, h: 1, isResizable: false },
		{ i: "e", x: 3, y: 3, w: 1, h: 1, isResizable: false },
		{ i: "f", x: 2, y: 2, w: 1, h: 1, isResizable: false },
		{ i: "g", x: 1, y: 3, w: 1, h: 1, isResizable: false },
		{ i: "h", x: 0, y: 0, w: 2, h: 1, isResizable: false },
		{ i: "i", x: 0, y: 4, w: 2, h: 1, isResizable: false },
		{ i: "j", x: 3, y: 3, w: 1, h: 1, isResizable: false },
		{ i: "k", x: 1, y: 1, w: 2, h: 1, isResizable: false },
		{ i: "l", x: 1, y: 3, w: 1, h: 1, isResizable: false },
		{ i: "m", x: 1, y: 3, w: 1, h: 1, isResizable: false },
		{ i: "n", x: 1, y: 3, w: 1, h: 1, isResizable: false },
		{ i: "o", x: 1, y: 6, w: 1, h: 1, isResizable: false },
		{ i: "p", x: 0, y: 5, w: 1, h: 1, isResizable: false },
		{ i: "g", x: 0, y: 7, w: 1, h: 1, isResizable: false },
		{ i: "q", x: 0, y: 3, w: 2, h: 1, isResizable: false },
	],
	xs: [
		{ i: "k", x: 1, y: 1, w: 2, h: 1, static: true },
		{ i: "i", x: 2, y: 2, w: 1, h: 1, static: true },
		{ i: "g", x: 0, y: 0, w: 1, h: 1, static: true },
		{ i: "j", x: 0, y: 3, w: 1, h: 1, static: true },
		{ i: "h", x: 0, y: 0, w: 1, h: 1, static: true },
		{ i: "f", x: 2, y: 1, w: 1, h: 1, static: true },
		{ i: "c", x: 0, y: 1, w: 2, h: 1, static: true },
		{ i: "e", x: 0, y: 3, w: 2, h: 1, static: true },
		{ i: "b", x: 0, y: 4, w: 1.5, h: 1, static: true },
		{ i: "d", x: 2, y: 3, w: 1.5, h: 1, static: true },
		{ i: "a", x: 2, y: 2, w: 3, h: 1, static: true },
		{ i: "l", x: 0, y: 1, w: 1, h: 1, static: true },
		{ i: "m", x: 0, y: 1, w: 1, h: 1, static: true },
		{ i: "n", x: 0, y: 1, w: 1, h: 1, static: true },
	],
};
