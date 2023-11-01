const fs = require('fs');

if (process.argv.length !== 3) {
	console.log("Usage: node modifier_html.js <fichier_html>");
	process.exit(1);
}

const htmlFile = process.argv[2];

try {
	const htmlContent = fs.readFileSync(htmlFile, 'utf-8');

	// Supprime le premier "/" des balises script et link
	const modifiedContent = htmlContent.replace(/<link rel="stylesheet" href="\/([^"]*)">/g, '<link rel="stylesheet" href="$1">');
	const finalContent = modifiedContent.replace(/<script type="module" crossorigin src="\/([^"]*)">/g, '<script type="module" crossorigin src="$1">');
	
	fs.writeFileSync(htmlFile, finalContent, 'utf-8');
	
	console.log(`\n Le fichier ${htmlFile} a été modifié avec succès. \n`);
} catch (err) {
	if (err.code === 'ENOENT') {
		console.log(`Le fichier ${htmlFile} n'existe pas.`);
	} else {
		console.error(`Une erreur s'est produite lors de la modification du fichier ${htmlFile}: ${err.message}`);
	}

	process.exit(1);
}
