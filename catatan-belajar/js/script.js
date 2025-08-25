// DOM elements
const elements = {
	btns: document.querySelectorAll('.note-button'),
	article: document.getElementById('note-article'),
	detailsElement: document.getElementById('menu-details'),
	themeToggle: document.getElementById('theme-toggle'),
	themeLights: document.querySelectorAll('#theme-light'),
	themeDarks: document.querySelectorAll('#theme-dark')
};

// Theme management
const theme = {
	isDark: window.matchMedia("(prefers-color-scheme: dark)").matches,

	init() {
		this.set(this.isDark);
	},

	toggle() {
		this.isDark = !this.isDark;
		this.set(this.isDark);
	},

	set(isDark) {
		const themeValue = isDark ? 'dark' : 'light';
		const buttonText = isDark ? 'Terang' : 'Gelap';

		document.documentElement.setAttribute('data-theme', themeValue);
		elements.themeToggle.innerText = buttonText;

		elements.themeLights.forEach(el => el.disabled = isDark);
		elements.themeDarks.forEach(el => el.disabled = !isDark);
	}
};

// Note management
const noteManager = {
	baseUrl: "https://harytri87.github.io/catatan-belajar/",

	async fetch(name) {
		const url = `${this.baseUrl}${name}/${name}.md`;
		
		try {
			const res = await fetch(url);
			return await res.text();
		} catch (err) {
			console.error("Error fetching note:", err);
			return null;
		}
	},

	display(content) {
		if (!content) return;
		
		const html = marked.parse(content);
		elements.article.innerHTML = html;
		hljs.highlightAll();
	},

	generateSlug(text) {
		return text
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, '')	// hapus karakter khusus
			.replace(/[\s]+/g, '-')		// ganti spasi jadi dash
	},

	addAnchorLinks() {
		const headings = elements.article.querySelectorAll('h1, h2, h3, h4, h5, h6');
		
		headings.forEach(heading => {
			const content = heading.textContent;
			const id = this.generateSlug(content);
			
			heading.innerHTML = `<a href="#${id}" id="${id}" class="heading-anchor">${content}</a>`;
		});
	},

	async load(noteName) {
		const content = await this.fetch(noteName);
		this.display(content);
		this.addAnchorLinks();
		elements.detailsElement.removeAttribute('open');
	}
};

// Event listeners
elements.btns.forEach(btn => {
	btn.addEventListener('click', () => {
		const noteName = btn.getAttribute('data-note');
		noteManager.load(noteName);
	});
});

elements.themeToggle.addEventListener('click', () => theme.toggle());

// Initialize
theme.init();