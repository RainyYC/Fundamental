import { player, global, playerStart, globalStart } from './Player';
import { getUpgradeDescription, invisibleUpdate, switchTab, numbersUpdate, visualUpdate, finalFormat } from './Update';
import { buyBuilding, buyUpgrades, stageResetCheck } from './Stage';
import { Alert, Prompt, setTheme, switchTheme } from './Special';

/* There might be some problems with incorect build, imports being called in wrong order. */

export const getId = (id: string) => { //To type less and check if ID exist
    const i = document.getElementById(id);
    if (i !== null) {
        return i;
    }
    throw new TypeError(`ID "${id}" not found.`); //New or not, wont change result
};

const updatePlayer = (load: any) => {
    if (Object.prototype.hasOwnProperty.call(load, 'player') && Object.prototype.hasOwnProperty.call(load, 'global')) {
        Object.assign(player, load.player);
        global.intervals = load.global.intervals;
    } else {
        Alert('Save file coudn\'t be loaded as its missing important info.');
    }
};

export const reLoad = (loadSave = false) => {
    const { stage } = player;

    if (loadSave) {
        const save = localStorage.getItem('save');
        const theme = localStorage.getItem('theme');
        if (save !== null) {
            const load = JSON.parse(atob(save));
            updatePlayer(load);
            Alert(`Welcome back, you were away for ${finalFormat((Date.now() - player.time.lastUpdate), 0, 'time')}.`);
        } else {
            console.warn('Save file wasn\'t detected.');
        }
        if (theme !== null) {
            global.theme.default = false;
            global.theme.stage = Number(theme);
        }
    }
    switchTheme();
    switchTab();
    //Hide footer
    getId('stageReset').textContent = 'You are not ready';
    getId('stageWord').textContent = global.stage.word[stage - 1];
    getId('stageWord').style.color = global.stage.wordColor[stage - 1];
    if (player.energy.total >= 9) {
        for (let i = 0; i < player.upgrades.length; i++) {
            if (player.upgrades[i] === 1) {
                getId(`upgrade${[i + 1]}`).style.backgroundColor = 'forestgreen';
            }
        }
    }
    if (stage > 1) {
        for (let i = 0; i < player.upgradesW.length; i++) {
            if (player.upgradesW[i] === 1) {
                getId(`upgradeW${[i + 1]}`).style.backgroundColor = 'forestgreen';
            }
        }
    }
};

reLoad(true);

/* Stage tab */
getId('particlesBtn').addEventListener('click', () => buyBuilding(player.quarks, player.particles));
getId('atomsBtn').addEventListener('click', () => buyBuilding(player.particles, player.atoms));
getId('moleculesBtn').addEventListener('click', () => buyBuilding(player.atoms, player.molecules));
for (let i = 1; i <= playerStart.upgrades.length; i++) {
    getId(`upgrade${i}`).addEventListener('mouseover', () => getUpgradeDescription(i));
    getId(`upgrade${i}`).addEventListener('click', () => buyUpgrades(i));
    getId(`upgrade${i}`).addEventListener('focus', () => buyUpgrades(i)); //Atempt to give Screen Readers ability to buy upgrades
}
for (let i = 1; i <= playerStart.upgradesW.length; i++) {
    getId(`upgradeW${i}`).addEventListener('mouseover', () => getUpgradeDescription(i, 'water'));
    getId(`upgradeW${i}`).addEventListener('click', () => buyUpgrades(i, 'water'));
    getId(`upgradeW${i}`).addEventListener('focus', () => buyUpgrades(i, 'water'));
}
getId('stageReset').addEventListener('click', async() => await stageResetCheck());

/* Settings tab */
getId('save').addEventListener('click', async() => await saveLoad('save'));
getId('file').addEventListener('change', async() => await saveLoad('load'));
getId('export').addEventListener('click', async() => await saveLoad('export'));
getId('delete').addEventListener('click', async() => await saveLoad('delete'));

getId('switchTheme0').addEventListener('click', () => setTheme(0, true));
for (let i = 1; i <= global.stage.word.length; i++) {
    getId(`switchTheme${i}`).addEventListener('click', () => setTheme(i));
}

/* Footer */
getId('stageTabBtn').addEventListener('click', () => switchTab('stage'));
getId('settingsTabBtn').addEventListener('click', () => switchTab('settings'));

/* Intervals */
setInterval(invisibleUpdate, global.intervals.main);
setInterval(numbersUpdate, global.intervals.numbers);
setInterval(visualUpdate, global.intervals.visual);
//setInterval(saveLoad, global.intervals.autoSave, 'save'); //Easier to test when its off

/* Promise returned in function argument where a void return was expected. */
/* I have no idea what does that even mean... I have to use async since 'await saveFile[0].text()' must have await in it.*/
async function saveLoad(type: string) {
    switch (type) {
        case 'load': {
            const id = getId('file') as HTMLInputElement;
            const saveFile = id.files;
            if (saveFile === null) {
                return Alert('Loaded file wasn\'t found.');
            }
            const text = await saveFile[0].text();

            try {
                const load = JSON.parse(atob(text));
                updatePlayer(load);
                reLoad();
            } catch {
                Alert('Incorrect save file format.');
            } finally {
                id.value = ''; //Remove inputed file
            }
            break;
        }
        case 'save': {
            const save = btoa(`{"player":${JSON.stringify(player)},"global":{"intervals":${JSON.stringify(global.intervals)}}}`);
            localStorage.setItem('save', save);
            getId('isSaved').textContent = 'Saved';
            global.lastSave = 0;
            break;
        }
        case 'export': {
            await saveLoad('save');
            const save = localStorage.getItem('save');
            if (save === null) {
                return Alert('Save file wasn\'t found. Even though game was saved just now...');
            }
            const a = document.createElement('a');
            a.href = 'data:text/plain;charset=utf-8,' + save;
            a.download = 'test.txt'; //Add choice for a name, later
            a.click();
            break;
        }
        case 'delete': {
            const ok = await Prompt("This will truly delete your save file!\nType in 'delete' to confirm.");
            if (ok === 'delete' || ok === 'Delete') {
                localStorage.clear();
                const deletePlayer = structuredClone(playerStart);
                const deleteGlobal = structuredClone(globalStart);
                Object.assign(player, deletePlayer);
                Object.assign(global, deleteGlobal);
                player.time.started = Date.now();
                player.time.lastUpdate = player.time.started;
                reLoad();
            } else if (ok !== false) {
                Alert('Save file wasn\'t deleted.');
            }
            break;
        }
    }
}
