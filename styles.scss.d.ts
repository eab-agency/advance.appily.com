// styles.scss.d.ts

// Define the module's type here
declare module "*.scss" {
	const content: { [className: string]: string };
	export = content;
}
