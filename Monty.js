function logResult(message) {
    const output = document.getElementById('output');
    output.textContent += message + '\n';
}

function newGame() {
    // Reinitialisation de l'affichage
    document.getElementById('output').textContent = '';
    logResult("Nouvelle partie commencée. Choisissez votre stratégie pour jouer.");
}

function playGame(strategy) {
    
    document.getElementById('output').textContent = '';

    // Ici je place la voiture derriere une des trois portes
    const carDoor = Math.floor(Math.random() * 3) + 1;

    // Le candidat fait un choix initial
    const initialChoice = Math.floor(Math.random() * 3) + 1;

    // l'animateur ouvre une porte avec une chevre
    let doors = [1, 2, 3];
    let remainingDoors = doors.filter(door => door !== initialChoice && door !== carDoor);
    const hostOpens = remainingDoors[Math.floor(Math.random() * remainingDoors.length)];

    // determination du choix final du candidat en fonction de la strategie
    let finalChoice;
    if (strategy === 'stay') {
        finalChoice = initialChoice;
    } else if (strategy === 'switch') {
        finalChoice = doors.find(door => door !== initialChoice && door !== hostOpens);
    } else if (strategy === 'random') {
        // Ici le candidat decide aleatoirement de garder ou changer
        if (Math.random() < 0.5) {
            finalChoice = initialChoice;
        } else {
            finalChoice = doors.find(door => door !== initialChoice && door !== hostOpens);
        }
    } else {
        logResult("Stratégie invalide ! Choisissez 'stay', 'switch' ou 'random'.");
        return;
    }

    // on verifie si le candidat gagne
    const win = finalChoice === carDoor;
    let strategyName = (strategy === 'stay') ? 'Garder' : (strategy === 'switch') ? 'Changer' : 'Aléatoire';
    logResult(`Stratégie : ${strategyName}, Vous ${win ? 'GAGNEZ' : 'PERDEZ'} !`);
}

// Simulatio de plusieurs parties
function simulateGames(strategy, numGames) {
    
    document.getElementById('output').textContent = '';

    let wins = 0;
    for (let i = 0; i < numGames; i++) {
        
        const carDoor = Math.floor(Math.random() * 3) + 1;

        const initialChoice = Math.floor(Math.random() * 3) + 1;

        let doors = [1, 2, 3];
        let remainingDoors = doors.filter(door => door !== initialChoice && door !== carDoor);
        const hostOpens = remainingDoors[Math.floor(Math.random() * remainingDoors.length)];

        let finalChoice;
        if (strategy === 'stay') {
            finalChoice = initialChoice;
        } else if (strategy === 'switch') {
            finalChoice = doors.find(door => door !== initialChoice && door !== hostOpens);
        } else if (strategy === 'random') {
            // Ici le candidat decide aleatoirement de garder ou changer
            if (Math.random() < 0.5) {
                finalChoice = initialChoice;
            } else {
                finalChoice = doors.find(door => door !== initialChoice && door !== hostOpens);
            }
        } else {
            logResult("Stratégie invalide ! Choisissez 'stay', 'switch' ou 'random'.");
            return;
        }

        if (finalChoice === carDoor) {
            wins++;
        }
    }
    let strategyName = (strategy === 'stay') ? 'Garder' : (strategy === 'switch') ? 'Changer' : 'Aléatoire';
    logResult(`Après ${numGames} parties avec la stratégie '${strategyName}' :`);
    logResult(`Gagnés : ${wins}`);
    logResult(`Perdus : ${numGames - wins}`);
    logResult(`Pourcentage de victoire : ${(wins / numGames * 100).toFixed(2)}%`);
}
