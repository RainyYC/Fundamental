import Overlimit from './Limit';
import { getId, updateCollapsePointsText } from './Main';
import { assignStrangeInfo, calculateMaxLevel, assignMilestoneInformation, assignPuddles, toggleConfirm, toggleSwap, calculateEffects, getDischargeScale, assignBuildingInformation, assignMaxRank, assignTrueEnergy, calculateResearchCost, autoUpgradesSet, autoResearchesSet, autoElementsSet } from './Stage';
import type { globalType, playerType } from './Types';
import { format, visualUpdateResearches } from './Update';
import { prepareVacuum } from './Vacuum';

export const player: playerType = { //Only for information that need to be saved (cannot be calculated)
    version: 'v0.2.1',
    fileName: 'Fundamental, [dateD.M.Y] [timeH-M-S], [stage]',
    stage: {
        true: 1,
        current: 1,
        active: 1,
        resets: 0,
        time: 0,
        peak: 0, //Interstellar only
        input: [0, 0]
    },
    discharge: { //Stage 1
        energy: 0,
        energyMax: 0,
        current: 0
    },
    vaporization: { //Stage 2
        clouds: new Overlimit('0'),
        cloudsMax: new Overlimit('0'),
        input: [3, 0] //[Boost, max]
    },
    accretion: { //Stage 3
        rank: 0
    },
    collapse: { //Stage 4, 5
        mass: 0.01235,
        massMax: 0.01235,
        stars: [0, 0, 0],
        show: 0,
        input: [2, 1e6], //[Boost, wait]
        points: []
    },
    merge: { //Stage 5
        reward: [0], //[Galaxy groups]
        resets: 0
    },
    inflation: { //Stage 6
        tree: [],
        vacuum: false,
        resets: 0,
        age: 0
    },
    time: {
        updated: Date.now(),
        started: Date.now(),
        export: [0, 0, 0, 0],
        offline: 0,
        online: 0,
        stage: 0,
        universe: 0
    },
    buildings: [
        [] as unknown as playerType['buildings'][0], [ //Stage 1
            {
                current: new Overlimit('3'),
                total: new Overlimit('3'),
                trueTotal: new Overlimit('3')
            }, {
                true: 0, //Bought
                current: new Overlimit('0'), //On hands
                total: new Overlimit('0'), //This reset
                trueTotal: new Overlimit('0') //This stage
            }, {
                true: 0,
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }, {
                true: 0,
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }, {
                true: 0,
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }, {
                true: 0,
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }
        ], [ //Stage 2
            {
                current: new Overlimit('2.7753108348135e-3'),
                total: new Overlimit('2.7753108348135e-3'),
                trueTotal: new Overlimit('2.7753108348135e-3')
            }, {
                true: 0,
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }, {
                true: 0,
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }, {
                true: 0,
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }, {
                true: 0,
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }, {
                true: 0,
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }, {
                true: 0,
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }
        ], [ //Stage 3
            {
                current: new Overlimit('1e-19'),
                total: new Overlimit('1e-19'),
                trueTotal: new Overlimit('1e-19')
            }, {
                true: 0,
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }, {
                true: 0,
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }, {
                true: 0,
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }, {
                true: 0,
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }, {
                true: 0,
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }
        ], [ //Stage 4
            {
                current: new Overlimit('1'),
                total: new Overlimit('1'),
                trueTotal: new Overlimit('1')
            }, {
                true: 0,
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }, {
                true: 0,
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }, {
                true: 0,
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }, {
                true: 0,
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }, {
                true: 0,
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }
        ], [ //Stage 5
            {
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }, {
                true: 0,
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }, {
                true: 0,
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }, {
                true: 0,
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }
        ], [ //Stage 6
            {
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }, {
                true: 0,
                current: new Overlimit('0'),
                total: new Overlimit('0'),
                trueTotal: new Overlimit('0')
            }
        ]
    ],
    strange: [ //Stage 5
        {
            current: 0,
            total: 0
        }, {
            current: 0,
            total: 0
        }
    ],
    cosmon: { //Stage 6
        current: 0,
        total: 0
    },
    /* Because I'm lazy to write 50+ 0's, all empty [] auto added */
    upgrades: [],
    researches: [],
    researchesExtra: [],
    researchesAuto: [],
    ASR: [], //Auto Structures Research
    elements: [],
    strangeness: [],
    milestones: [],
    challenges: {
        active: null,
        void: [0, 0, 0, 0, 0, 0],
        voidCheck: [0, 0, 0, 0, 0, 0]
    },
    toggles: {
        normal: [], //class 'toggleNormal'
        /* Auto Stage switch[0]; Auto disable Vaporization[1]; Auto disable Stage[2]; Automatic leave[3] */
        confirm: [], //Class 'toggleConfirm'
        /* Stage[0]; Discharge[1]; Vaporization[2]; Rank[3]; Collapse[4]; Merge[5] */
        buildings: [], //Class 'toggleBuilding' ([0] everywhere, is toggle all)
        hover: [], //Class 'toggleHover'
        /* Upgrades/Researches/Elements[0] */
        max: [], //Class 'toggleMax'
        /* Researches[0] */
        auto: [], //Class 'toggleAuto'
        /* Stage[0], Discharge[1], Vaporization[2], Rank[3], Collapse[4],
           Upgrades[5], Researches[6], ResearchesExtra[7], Elements[8] */
        shop: {
            input: 0,
            wait: [2]
        }
    },
    history: {
        stage: { //[time, quarks, strangelets, reserve]
            best: [3.1556952e16, 0, 0, 0],
            list: [],
            input: [5, 10]
        },
        vacuum: { //[time, state, cosmon]
            best: [3.1556952e16, false, 0],
            list: [],
            input: [5, 10]
        }
    },
    events: [false, false] //[0] is reserved for Intergalactic resets; [1] for entering Abyss
};

export const global: globalType = { //For information that doesn't need to be saved
    tab: 'stage',
    subtab: {
        stageCurrent: 'Structures',
        settingsCurrent: 'Settings',
        upgradeCurrent: 'Upgrades',
        strangenessCurrent: 'Matter',
        inflationCurrent: 'Researches'
    } as globalType['subtab'],
    tabList: { //Order comes from footer
        tabs: ['stage', 'upgrade', 'strangeness', 'inflation', 'settings'],
        stageSubtabs: ['Structures', 'Advanced'],
        settingsSubtabs: ['Settings', 'History', 'Stats'],
        upgradeSubtabs: ['Upgrades', 'Elements'],
        strangenessSubtabs: ['Matter', 'Milestones'],
        inflationSubtabs: ['Researches', 'Milestones']
    } as globalType['tabList'],
    debug: {
        offlineSpeed: 0.2,
        offlineUpdate: false,
        errorID: true, //Notify about missing ID
        errorQuery: true, //About incorect Query
        errorGain: true, //About NaN or Infinity
        timeLimit: false, //About reaching time limit
        rankUpdated: null, //Rank number
        historyStage: null, //Stage resets
        historyVacuum: null //Vacuum resets
    },
    trueActive: 1,
    lastSave: 0,
    paused: true,
    footer: true,
    hotkeys: {
        disabled: true,
        shift: false,
        ctrl: false
    },
    automatization: { //Sorted cheapest first
        autoU: [ //Upgrades
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ],
        autoR: [ //Researches
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ],
        autoE: [ //Researches Extra
            [],
            [],
            [],
            [],
            [],
            []
        ],
        elements: []
    },
    dischargeInfo: {
        energyType: [[]],
        energyStage: [0],
        energyTrue: 0,
        tritium: new Overlimit('0'),
        base: 4,
        total: 0,
        next: 1
    },
    vaporizationInfo: {
        trueResearch0: 0,
        trueResearch1: 0,
        trueResearchRain: 0,
        get: new Overlimit('0')
    },
    accretionInfo: {
        unlockA: [2, 4, 8, 11], //Quick look up for required Upgrades
        rankU: [1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5], //Upgrades
        rankR: [1, 1, 2, 2, 3, 3, 3, 4, 5], //Researches
        rankE: [2, 3, 4, 5, 3], //Researches Extra
        dustSoft: 1,
        maxRank: 4,
        rankCost: [5.9722e27, 1e-7, 1e10, 1e24, 5e29, 2.45576045e31, 1.98847e40],
        rankColor: ['blue', 'cyan', 'gray', 'gray', 'gray', 'darkviolet', 'orange', 'gray'],
        rankName: ['海洋界', '宇宙尘', '流星体', '小行星', '行星体', '巨行星', '原恒星', '原星系'],
        rankImage: ['Ocean%20world.png', 'Dust.png', 'Meteoroids.png', 'Asteroid.png', 'Planet.png', 'Giant.png', 'Protostar.png', 'Protogalaxy.png']
    },
    collapseInfo: {
        neutronEffect: 1,
        unlockB: [0, 0.01235, 0.23, 10, 40, 1000], //Buildings
        unlockU: [0.01235, 0.076, 1.3, 10, 40], //Upgrades
        unlockR: [0.18, 0.3, 0.8, 1.3, 40, 1000], //Researches
        newMass: 0,
        starCheck: [0, 0, 0],
        trueStars: 0,
        pointsLoop: 0 //Micro optimization
    },
    mergeInfo: {
        galaxyBase: 0,
        checkReward: [0]
    },
    inflationInfo: {
        globalSpeed: 1,
        preonCap: new Overlimit('1e14'),
        dustCap: new Overlimit('1e48'),
        massCap: 0.01235,
        preonTrue: new Overlimit('0'),
        dustTrue: new Overlimit('0')
    },
    intervalsId: {
        main: undefined,
        numbers: undefined,
        visual: undefined,
        autoSave: undefined,
        mouseRepeat: undefined
    },
    stageInfo: {
        word: ['', 'Microworld', 'Submerged', 'Accretion', 'Interstellar', 'Intergalactic', 'Abyss'],
        text: ['', '微观', '浸没', '积聚', '星际', '星系', '深渊'],
        textColor: ['', 'cyan', 'blue', 'gray', 'orange', 'darkorchid', 'darkviolet'],
        buttonBorder: ['', 'darkcyan', '#386cc7', '#424242', '#a35700', '#8f004c', '#6c1ad1'],
        imageBorderColor: ['', '#008b8b', '#1460a8', '#5b5b75', '#e87400', '#b324e2', '#5300c1'],
        activeAll: [1]
    },
    buildingsInfo: {
        maxActive: [0, 4, 6, 5, 5, 4, 2], //Need to also count index [0]
        name: [
            [],
            ['Mass', '前子', '夸克', '粒子', '原子', '分子'], //[0] Must be 'Mass' // but why
            ['摩尔', '水滴', '水洼', '池塘', '湖泊', '海洋', '大洋'],
            ['质量', '宇宙尘', '星子', '原行星', '卫星', '子卫星'],
            ['元素', '褐矮星', '主序星', '红超巨星', '蓝特超巨星', '准恒星'],
            ['Stars', 'Nebulas', 'Star clusters', 'Galaxies'],
            ['Dark matter', 'Universes']
        ],
        hoverText: [
            [],
            ['质量', '前子', '夸克', '粒子', '原子'],
            ['Tritium', '水滴', '水洼', '池塘', '湖泊', '海洋'],
            ['前子硬上限', '宇宙尘', '星子', '原行星', '卫星'],
            ['元素', '元素', '元素', '元素', '元素'],
            ['Interstellar Stars', 'Interstellar Stars', 'Nebulas and Star clusters'],
            ['Dark matter']
        ],
        type: [ //Visual only
            [],
            ['生产', '生产', '生产', '生产', '生产'],
            ['生产', '生产', '加成', '加成', '加成', '加成'],
            ['生产', '生产', '生产', '加成', '加成'],
            ['生产', '生产', '生产', '生产', '生产'],
            ['生产', '加成', '加成'],
            ['生产']
        ],
        startCost: [
            [],
            [0, 0.005476, 6, 3, 24, 3],
            [0, 2.7753108348135e-3, 100, 1e7, 1e18, 1e23, 2.676e25],
            [0, 1e-19, 1e-9, 1e21, 1e17, 1e22],
            [0, 1, 1e5, 1e15, 1e27, 1e50],
            [0, 1e50, 1e54, 1e5],
            [0, 1]
        ],
        increase: [
            [],
            [0, 1.4, 1.4, 1.4, 1.4, 1.4],
            [0, 1.15, 1.2, 1.25, 1.35, 1.4, 4],
            [0, 1.15, 1.25, 1.35, 10, 10],
            [0, 1.4, 1.55, 1.70, 1.85, 2],
            [0, 2, 2, 1.11],
            [0, 2]
        ],
        producing: []
    },
    strangeInfo: {
        name: ['Strange quarks', 'Strangelets'],
        stageBoost: [1, 1, 1, 1, 1, 1],
        strangeletsInfo: [0, 1], //[Producing, Improving]
        quarksGain: 0, //Interstellar only
        bestHistoryRate: 0 //Quarks
    },
    upgradesInfo: [
        {} as globalType['upgradesInfo'][0], { //Stage 1
            name: [
                '弱力',
                '强力',
                '电子',
                '质子',
                '中子',
                '迭合',
                '氕',
                '氘',
                '氚',
                '核聚变'
            ],
            effectText: [
                () => '粒子生产 8 倍夸克。',
                () => '层子使夸克紧密连结为粒子，使粒子变得 16 倍便宜。',
                () => `${player.inflation.vacuum ? '原子' : '粒子'}变得 8 倍便宜。`,
                () => `原子生产 ${player.inflation.vacuum ? 6 : 4} 倍粒子。${player.upgrades[1][3] !== 1 && player.upgrades[1][5] !== 1 && player.buildings[1][player.inflation.vacuum ? 4 : 2].total.lessOrEqual('0') ? '\n(没有原子时无法购买)' : ''}`,
                () => `分子生产 4 倍原子。${player.upgrades[1][4] !== 1 && player.upgrades[1][5] !== 1 && player.buildings[1][player.inflation.vacuum ? 5 : 3].total.lessOrEqual('0') ? '\n(没有分子时无法购买)' : ''}`,
                () => `使你可以重新获得花费掉的能量，并在能量达到目标时为所有${player.inflation.vacuum ? ' 微观  ' : ''}结构的生产提供 ${format(global.dischargeInfo.base, { padding: true })} 倍加成。${player.inflation.vacuum ? `\n(In true Vacuum it will also reset resources and all non-self made Structures from all Stages${player.stage.true >= 7 ? ' before Abyss' : ''}, and enough self-made Structures to fully regain spent Energy)` : ''}`,
                () => `使结构的价格增长降低 ${format(calculateEffects.S1Upgrade6() / 100)}。`,
                () => { //[7]
                    const selfBoost = calculateEffects.S1Upgrade7();
                    const selfPreons = calculateEffects.S1Upgrade7(true);
                    return `购买获得的结构对其自身提供 ${format(selfBoost)} 加成。${player.inflation.vacuum ? `\n(购买的前子加成自身 ${format(new Overlimit(selfBoost / selfPreons).power((player.buildings[1][1].true - 1) / 1000).multiply(selfPreons), { padding: true })}，软上限立刻开始。` : ''}`;
                },
                () => `分子以递减的速度产生分子。\n(${format(global.dischargeInfo.tritium, { padding: true })} 分子 / 秒)`,
                () => `未使用的能量^${format(0.5)} 加成至「氚」的分子生产。\n(加成：${format(Math.max(player.discharge.energy, 1) ** 0.5, { padding: true })})`
            ],
            startCost: [40, 60, 100, 120, 180, 360, 1200, 3600, 12000, 80000],
            maxActive: 10
        }, { //Stage 2
            name: [
                '分子到摩尔',
                '泛流', // Water spread, not yet decided
                '蒸发',
                '表面张力',
                '表面应力',
                '溪流',
                '河流',
                'Tsunami',
                'Tide'
            ],
            effectText: [
                () => `对于每个购买的水滴，水滴额外${player.inflation.vacuum ? '加成' : '生产'} ${format(player.inflation.vacuum ? 1.02 : 1.04)} 倍${player.inflation.vacuum ? '「氚」' : '摩尔'}。${player.upgrades[2][0] !== 1 && player.buildings[2][1].true < 1 && player.buildings[2][2].current.lessThan('1') ? '\n(没有购买的水滴时无法购买)' : ''}`,
                () => `每个水洼使水扩散更快，当前加成公式：${format(1.02)} ^ 有效水洼。\n超过 200 个的以及非购买获得的水洼以 ${format(0.7)} 次幂计入。\n(当前效果: ${format(calculateEffects.S2Upgrade1(), { padding: true })})`,
                () => `获得将水滴转换为云的能力。云获取公式为 '(云 ^ (1 / 软上限) + (水滴 / ${format(calculateEffects.S2Upgrade2())})) ^ 软上限 - 云'，当前软上限为 ${format(player.challenges.active === 0 ? 0.4 : player.inflation.vacuum ? 0.5 : 0.6)}。`,
                () => { //[3]
                    const power = calculateEffects.S2Upgrade3();
                    return `基于摩尔的 ${format(power)} 次幂，加成水洼。\n(当前效果：${format(new Overlimit(player.buildings[2][0].current).max('1').power(power), { padding: true })})`;
                },
                () => { //[4]
                    const power = calculateEffects.S2Upgrade4();
                    return `基于水滴的 ${format(power)} 次幂，加成水洼。\n(当前效果：${format(new Overlimit(player.buildings[2][1].current).max('1').power(power), { padding: true })})`;
                },
                () => `池塘提供额外的水洼。(每个池塘提供 ${format(calculateEffects.S2Upgrade5())} 个)`,
                () => `湖泊提供额外的池塘。(每个湖泊提供 ${format(calculateEffects.S2Upgrade6())} 个)`,
                () => 'Spreads enough water to make Seas increase current Lake amount. (1 extra Lakes per Sea)',
                () => 'Spreads water too fast. 1 extra Seas per Ocean.\nAlso will improve Oceans effect scaling.'
            ],
            startCost: [10, 1e6, 1e10, 1e3, 1e4, 2e9, 5e20, 1e28, 2e48],
            maxActive: 8
        }, { //Stage 3
            name: [
                '布朗运动',
                '气态',
                '微型流星',
                '粒子流不稳定性',
                '引力场',
                '瓦砾堆',
                '熔岩海',
                '静力平衡',
                '卫星系统',
                '大气层',
                '卵石积聚',
                '潮汐力',
                '环系统'
            ],
            effectText: [
                () => `每个购买的宇宙尘之间的随机碰撞使${player.inflation.vacuum ? '前子硬上限再次延后' : '质量生产获得加成'}.\n(每个购买的宇宙尘加成 ${format(calculateEffects.S3Upgrade0())})`,
                () => `积聚新的物质，根据现有的宇宙尘数量加成其自身，非购买获得的宇宙尘此效果较弱。\n(当前效果：${format(calculateEffects.S3Upgrade1(), { padding: true })})`,
                () => '尽管只是一颗小流星，但对于将来的某物是个不错的基底。\n(解锁一个新结构，同时宇宙尘获得 2 倍加成)',
                () => `小块物体会自发积聚为团块。\n(购买的星子对自身加成 ${format(calculateEffects.S3Upgrade3())})`,
                () => '物体具有足够的质量以在互相之间产生可观的引力了。\n(解锁一个新结构，同时星子获得 3 倍加成)',
                () => `碰撞产生的碎屑会再次积聚。来自宇宙尘的${player.inflation.vacuum ? '前子硬上限延后' : '质量生产'}获得 3 倍加成。`,
                () => `融化星核，加速积聚。\n(宇宙尘效果获得 ${format(2 * 1.5 ** player.researches[3][7])} 倍提升)`,
                () => `由于星子的静力平衡，每个购买的星子加成自身 ${format(1.02)}。`,
                () => '解锁一个新结构。',
                () => `来自宇宙尘的${player.inflation.vacuum ? '前子硬上限延后' : '质量生产'}从阻力与逃逸速度中得到 2 倍加成。`,
                () => `来自宇宙尘的${player.inflation.vacuum ? '前子硬上限延后' : '质量生产'}得到 ${8 * 2 ** player.researches[3][8]} 倍的极大加成。`,
                () => `卫星价格增长变小 2 倍。${player.inflation.vacuum ? '\n同时解锁了一个新结构。' : ''}`,
                () => '卫星效果增长变强'
            ],
            startCost: [1e-16, 1e-13, 1e-13, 1, 1e14, 1e17, 1e10, 1e22, 1e22, 1e23, 1e9, 1e26, 1e29],
            maxActive: 13
        }, { //Stage 4
            name: [
                '引力坍缩',
                '质子-质子链',
                '碳氮氧循环',
                'Helium fusion',
                'Nucleosynthesis'
            ],
            effectText: [
                () => `每个星星都会在其燃料耗尽后以其独有的方式加成生产。\n太阳质量${player.inflation.vacuum ? `在坍缩时为积聚质量除以 ${format(1.98847e33)}，并且 ` : ''}在坍缩时不会变少。(划过「残余」可以看到它们的效果)`,
                () => '聚合氕而非氘，解锁最初的 5 个「元素」。(在 元素 子标签页中)',
                () => '碳氮氧循环是氦与能量的更好来源，再解锁 5 个「元素」。',
                () => 'Through Triple-alpha and then Alpha process unlock 2 more Elements.',
                () => `Create new Atomic nuclei with Neutron capture (s-process and p-process).\nUnlock 1 more Element and +1 for every self-made ${player.stage.true < 7 ? '(not unlocked)' : 'Universe'}.`
            ],
            startCost: [100, 1000, 1e9, 1e48, 1e128],
            maxActive: 4
        }, { //Stage 5
            name: [
                'Molecular cloud',
                'Super Star cluster',
                'Quasar',
                'Galactic Merger'
            ],
            effectText: [
                () => `Nebula that is dense enough to block the light, it will boost Nebulas by ${format(calculateEffects.S5Upgrade0())}.`,
                () => `A very massive Star cluster that will boost Star clusters by ${format(calculateEffects.S5Upgrade1())}.`,
                () => `Boost per Galaxy will be increased by +${format(calculateEffects.S5Upgrade2(false, 1), { padding: true })}.\n(Effect will be stronger with more Solar mass past ${format(1e5)}, maxed at +1)`,
                () => `Unlock a new reset type that will bring Galaxies closer for potential Merging.${player.inflation.vacuum ? ' That reset behaves like a Galaxy reset, while also converting self-made Galaxies into non self-made through new and even bigger Structures. Can only be done once per Stage reset.' : ''}`
            ],
            startCost: [1e56, 1e60, 1e120, 1e160],
            maxActive: 4
        }, { //Stage 6
            name: [],
            effectText: [],
            startCost: [],
            maxActive: 0
        }
    ],
    researchesInfo: [
        {} as globalType['researchesInfo'][0], { //Stage 1
            name: [
                '更强的氕',
                '更好的氘',
                '更快的氚',
                '要求降低',
                '释能改进',
                '辐射释能'
            ],
            effectText: [
                () => `每级使价格增长降低 ${format(0.03)}。`,
                () => `购买获得的结构对其自身提供 ${format(0.01)} 加成。`,
                () => `分子产生分子的速度提高 ${format(calculateEffects.S1Research2())} 倍。`,
                () => `「释能」目标需求的增长降低。 (-2)\n(购买这项研究会让当前「释能」目标变为 ${format((getDischargeScale() - 2) ** player.discharge.current)} 能量)`,
                () => { //[4]
                    const newBase = calculateEffects.dischargeBase(player.researches[1][4] + 1);
                    return `由达成「释能」目标所提供的生成加成增加 ${format(newBase - global.dischargeInfo.base)}。\n(当前等价于 ${format((newBase / global.dischargeInfo.base) ** global.dischargeInfo.total, { padding: true })} 倍加成)`;
                },
                () => `「释能」目标可以加成「氚」。\n(当前效果：${format(calculateEffects.S1Research5())} ^ 等级)`
            ],
            cost: [],
            startCost: [1600, 4800, 16000, 32000, 16000, 24000],
            scaling: [400, 1200, 8000, 40000, 16000, 16000],
            max: [5, 4, 8, 2, 4, 3],
            maxActive: 6
        }, { //Stage 2
            name: [
                '更好的摩尔生产',
                '更好的水滴生产',
                '更强的表面张力',
                '更强的表面应力',
                '更多的溪流',
                '支流'
            ],
            effectText: [
                () => `水滴 3 倍${player.inflation.vacuum ? '提升「氚」' : '生产摩尔'}。${player.upgrades[2][2] === 1 || player.inflation.vacuum ? `\n有效等级${global.vaporizationInfo.trueResearch0 !== player.researches[2][0] ? `为 ${format(global.vaporizationInfo.trueResearch0, { padding: true })}，获得更多水滴以恢复有效等级` : '会在任何重置后被清空至 0'}。` : ''}`,
                () => `水洼 2 倍生产水滴。${player.upgrades[2][2] === 1 || player.inflation.vacuum ? `\n有效等级${global.vaporizationInfo.trueResearch1 !== player.researches[2][1] ? `为 ${format(global.vaporizationInfo.trueResearch1, { padding: true })}，获得更多水滴以恢复有效等级` : '会在任何重置后被清空至 0'}。` : ''}`,
                () => `「表面张力」的底数提高 ${format(0.005)}。\n(等价于 ${format(new Overlimit(player.buildings[2][0].current).max('1').power(calculateEffects.S2Upgrade3(player.researches[2][2] + 1) - calculateEffects.S2Upgrade3()).toNumber(), { padding: true })} 倍加成)`,
                () => `「表面应力」的底数提高 ${format(0.005)}。\n(等价于 ${format(new Overlimit(player.buildings[2][1].current).max('1').power(calculateEffects.S2Upgrade4(player.researches[2][3] + 1) - calculateEffects.S2Upgrade4()).toNumber(), { padding: true })} 倍加成)`,
                () => '更多的溪流会使你从中获得更多的水洼 (每个池塘再额外获得 1 个水洼)',
                () => '河流将分支出支流，使你从湖泊中获得更多池塘。 (每个湖泊再额外获得 1 个池塘)'
            ],
            cost: [],
            startCost: [10, 400, 1e4, 1e5, 1e14, 1e22],
            scaling: [1.366, 5, 1e3, 1e2, 1e3, 1e4],
            max: [8, 8, 4, 4, 2, 1],
            maxActive: 6
        }, { //Stage 3
            name: [
                '更大的体积',
                '黏连',
                '太空风化',
                '非弹性碰撞',
                '破坏性碰撞',
                '相接双星',
                '重力',
                '行星分化',
                '空气阻力'
            ],
            effectText: [
                () => '宇宙尘变强至 3 倍。',
                () => `宇宙尘颗粒互相之间发生黏连。(「布朗运动」提升 ${format(0.01)})`,
                () => '星子产生 3 倍宇宙尘。',
                () => `低速碰撞会使体积增长变得更快。\n来自宇宙尘的${player.inflation.vacuum ? '前子硬上限延后' : '质量生产'}提升至 2 倍。`,
                () => `星子之间的碰撞将产生大量碎屑。\n「粒子流不稳定性」效果提升 ${format(0.005)}。`,
                () => `一部分星子演化为了双星甚至三星系统而不是互相碰撞。\n来自宇宙尘的${player.inflation.vacuum ? '前子硬上限延迟' : '质量生成'}提升至 3 倍。`,
                () => { //[6]
                    const effect = calculateEffects.S3Research6(); //Remove 1 / result, if Overlimit.log() will allow base to be a bigger number
                    return `星子互相吸引，基于未使用质量的 ${format(effect > 1 ? 1 / new Overlimit(player.buildings[3][0].current).log(effect).toNumber() : 0, { padding: true })} 次幂提升自身生产。\n(当前效果：${format(effect, { padding: true })} ⟶ ${format(calculateEffects.S3Research6(player.researches[3][6] + 1), { padding: true })}，在 ${format(1e21)} 质量后变弱)`;
                },
                () => `「熔岩海」效果变强至 ${format(1.5)} 倍。`,
                () => `「卵石积聚」的积聚速度变得更快。\n来自宇宙尘的${player.inflation.vacuum ? '前子硬上限延迟' : '质量生成'}提升至 2 倍。`
            ],
            cost: [],
            startCost: [1e-16, 1e-15, 1e-5, 1e2, 1e10, 1e11, 1e15, 1e14, 1e12],
            scaling: [11, 111, 22, 10, 100, 100, 10, 1e4, 1e3],
            max: [9, 3, 8, 8, 2, 2, 6, 4, 4],
            maxActive: 9
        }, { //Stage 4
            name: [
                '行星系',
                '恒星系',
                '原行星盘',
                'Planetary nebula',
                'Gamma-ray burst',
                'Inner Black hole'
            ],
            effectText: [
                () => { //[0]
                    const base = calculateEffects.S4Research0_base();
                    return `从星子到行星，每级使所有星星获得 ${format(base)} 倍提升。\n(当前效果：${format(calculateEffects.S4Research0(base), { padding: true })})`;
                },
                () => { //[1]
                    const base = calculateEffects.S4Research1();
                    return `所有购买的星星互相加成 ${format(base)} 倍.\n(当前效果：${format(new Overlimit(base).power(global.collapseInfo.trueStars), { padding: true })} ⟶ ${format(new Overlimit(calculateEffects.S4Research1(player.researches[4][1] + 1)).power(global.collapseInfo.trueStars), { padding: true })})`;
                },
                () => `提升「行星系」效果增长，并使其最高等级加 3。\n(「行星系」的效果将提升 ${format(calculateEffects.S4Research0(calculateEffects.S4Research0_base(player.researches[4][2] + 1) / calculateEffects.S4Research0_base()), { padding: true })} 倍)`,
                () => "Matter will be expelled from Red giants, this will boost Main-sequence Stars by 2, as well increase 'Planetary system' max level by +3.",
                () => `An immensely energetic explosion that will boost all Stars by ${format(calculateEffects.S4Research4(), { padding: true })}${player.researches[4][4] < 2 ? ` ⟶ ${format(calculateEffects.S4Research4(false, player.researches[4][4] + 1), { padding: true })}` : ''}.\n(Effect will be stronger with more Black holes${player.elements[23] >= 1 ? ' and Solar mass' : ''})`,
                () => 'Quasi-stars will Collapse into Intermediate-mass Black holes that are equivalent to +1 (Stellar) Black holes per level.'
            ],
            cost: [],
            startCost: [1e3, 5e4, 1e8, 1e11, 1e28, 1e154],
            scaling: [10, 200, 1e12, 1, 2e8, 1],
            max: [3, 2, 1, 1, 2, 1],
            maxActive: 5
        }, { //Stage 5
            name: [
                'Higher density',
                'Type frequency'
            ],
            effectText: [
                () => `Higher density of Nebulas, will allow them to produce higher tier of Stars, but each tier is 4 times slower than previous one. Also will boost Nebulas by 2.\nNext tier will be ${global.buildingsInfo.name[4][Math.min(player.researches[5][0] + 2, player.inflation.vacuum ? 5 : 4)]}.`,
                () => `More of same Star type will be found within Star cluster. Star clusters will be improved by 2 and will also boost lower tier of Stars, but 2 times less than previous one.\nNext tier will be ${global.buildingsInfo.name[4][Math.max((player.inflation.vacuum ? 4 : 3) - player.researches[5][1], 1)]}.`
            ],
            cost: [],
            startCost: [1e54, 1e58],
            scaling: [1e8, 1e8],
            max: [4, 4],
            maxActive: 2
        }, { //Stage 6
            name: [],
            effectText: [],
            cost: [],
            startCost: [],
            scaling: [],
            max: [],
            maxActive: 0
        }
    ],
    researchesExtraInfo: [
        {} as globalType['researchesExtraInfo'][0], { //Stage 1
            name: [
                'Extra strong force',
                'Improved formula',
                'Accretion',
                'Later Preons',
                'Impulse'
            ],
            effectText: [
                () => "Mesons will be able to bind Particles to form Atoms, which will make Atoms to be affected by 'Strong force'.\n(Atoms will be 16 times cheaper)",
                () => { //[1]
                    const now = calculateEffects.S1Extra1();
                    const after = calculateEffects.S1Extra1(player.researchesExtra[1][1] + 1);
                    return `Improve 'Tritium' formula, current formula is log${format(now)}${player.researchesExtra[1][1] < 4 ? ` ⟶ log${format(after)}.\n(Which is equal to ${format(logAny(now, after), { padding: true })}x improvement)` : '.'}`;
                },
                () => `First level is to begin the Accretion, second level is to Submerge it.\nAll Structures produce Energy on creation and all resets affect all lower Stages, while also doing Discharge reset.\nAccretion Mass is Microworld Mass * ${format(1.78266192e-33)} and Moles are Molecules / ${format(6.02214076e23)}.`,
                () => { //[3]
                    const power = calculateEffects.S1Extra3();
                    return `Boost Preons and delay hardcap by current Energy ^${format(power)}.\n(Effect: ${format(Math.max(player.discharge.energy, 1) ** power, { padding: true })} ⟶ ${format(Math.max(player.discharge.energy, 1) ** calculateEffects.S1Extra3(player.researchesExtra[1][3] + 1), { padding: true })})`;
                },
                () => { //[4]
                    const base = calculateEffects.S1Extra4();
                    return `Discharge goals will be able to boost all Interstellar Stars, strength is based on Energy and Discharge base.\nCurrent base is ${format(base, { padding: true })}, total boost is ${format(new Overlimit(base).power(global.dischargeInfo.total), { padding: true })}.`;
                }
            ],
            cost: [],
            startCost: [2000, 40000, 12000, 16000, 160000],
            scaling: [0, 16000, 68000, 16000, 0],
            max: [1, 4, 2, 4, 1],
            maxActive: 0
        }, { //Stage 2
            name: [
                '蒸腾',
                '积雨云',
                '雷暴云',
                'Water Accretion'
            ],
            effectText: [
                () => '计算云获取量时，水滴数以当前重置生产总量计，而非当前拥有数量。',
                () => { //[1]
                    const maxLevel = player.researchesExtra[2][1];
                    const trueLevel = global.vaporizationInfo.trueResearchRain;
                    const penalty = player.buildings[2][2].current.lessThan('1');
                    const effect = calculateEffects.S2Extra1;
                    return `一部分云开始落下雨滴。基于当前云数加成水洼，即使还没有水洼。${player.researchesExtra[2][2] < 1 ? `\n有效等级${trueLevel !== maxLevel ? `为 ${format(trueLevel, { padding: true })}，随着获得更多水滴而恢复` : '会在任何重置后被清空至 0'}，不影响水洼之前的增益` : ''}\n(当前效果：${format(penalty ? (effect(maxLevel) - 1) : effect(trueLevel), { padding: true })} ⟶ ${format(penalty ? (effect(maxLevel + 1) - 1) : effect(maxLevel + (trueLevel === maxLevel ? 1 : 0)), { padding: true })}，${format(1e6)} 云后效果变弱)`;
                },
                () => `使「积雨云」以递减的幅度加成海洋，同时使其有效等级不再在重置时清空。\n(当前效果：${format(calculateEffects.S2Extra2(calculateEffects.S2Extra1(global.vaporizationInfo.trueResearchRain), 1), { padding: true })})`,
                () => { //[3]
                    const level = player.researchesExtra[2][3];
                    const tension = player.upgrades[2][3] === 1 ? new Overlimit(player.buildings[2][0].current).max('1').power(calculateEffects.S2Upgrade3()).toNumber() : 1;
                    const stress = player.upgrades[2][4] === 1 ? new Overlimit(player.buildings[2][1].current).max('1').power(calculateEffects.S2Upgrade4()).toNumber() : 1;
                    return `Submerge and boost Stars with 'Surface tension'. Also with 'Surface stress' ^${format(0.5)} at level 2, full power at level 3.\n(Boost to Stars: ${level < 3 ? `${format(level < 1 ? 1 : tension * (level > 1 ? stress ** 0.5 : 1), { padding: true })} ⟶ ` : ''}${format(tension * (level < 1 ? 1 : stress ** (level > 1 ? 1 : 0.5)), { padding: true })})`;
                }
            ],
            cost: [],
            startCost: [1e18, 1e12, 1e26, 1e14],
            scaling: [1, 1e3, 1, 1e8],
            max: [1, 3, 1, 3],
            maxActive: 3
        }, { //Stage 3
            name: [
                '段位加成',
                '效率增长',
                '重量',
                '粘度',
                'Efficient submersion'
            ],
            effectText: [
                () => `每级使宇宙尘生产加成 ${format(1.11)}，其最高等级取决于当前段位。\n(当前效果：${format(1.11 ** player.researchesExtra[3][0], { padding: true })})`,
                () => { //[1]
                    const base = calculateEffects.S3Extra1();
                    return `来自宇宙尘的${player.inflation.vacuum ? '前子硬上限延后' : '质量生产'}变得更强，当前公式为 '${format(base)} ^ 段位'。\n(当前效果：${format(base ** player.accretion.rank, { padding: true })} ⟶ ${format(calculateEffects.S3Extra1(player.researchesExtra[3][1] + 1) ** player.accretion.rank, { padding: true })})`;
                },
                () => '「引力场」能够再次以较低的效果加成星子。（2 倍加成）',
                () => `每级使「气态」效果变强 ${format(calculateEffects.S3Upgrade1(player.researchesExtra[3][3] + 1) / calculateEffects.S3Upgrade1(), { padding: true })} 倍。`,
                () => `Submerge quicker by boosting Puddles, improved by current Rank.\n(Current boost: ${format(calculateEffects.S3Extra4())} ⟶ ${format(calculateEffects.S3Extra4(player.researchesExtra[3][4] + 1))})`
            ],
            cost: [],
            startCost: [1e-18, 1e-7, 1e26, 1e9, 1e-10],
            scaling: [10, 100, 1, 1e5, 1e12],
            max: [14, 6, 1, 5, 1],
            maxActive: 4
        }, { //Stage 4
            name: [
                '新星',
                'Mass transfer',
                'White dwarfs',
                'Quark-nova'
            ],
            effectText: [
                () => `这种剧烈的恒星爆炸是元素的主要来源，也会形成新的星星。\n解锁一个新的星星，并在使其坍缩后解锁更多。\n(其解锁需要 ${format(global.collapseInfo.unlockB[Math.min(player.researchesExtra[4][0] + 2, 4)])} 太阳质量)`,
                () => `Star material will transfer from one Star to another, improving Solar mass gain${player.inflation.vacuum ? ' (also delaying Preons hardcap)' : ''} by ${format(calculateEffects.S4Extra1())}.\nImproved by 'Star system' levels and also improves its scaling (effect increase for 'Star system' is ${format(new Overlimit(calculateEffects.S4Research1(undefined, 1) / calculateEffects.S4Research1(undefined, 0)).power(global.collapseInfo.trueStars), { padding: true })}).`,
                () => `After matter were dispeled from Red giant, White dwarf was all that remained.\nImproves effect of '[6] Carbon' by +${format(0.5)} and increases max level of 'Star system' by +1.`,
                () => "As Neutron stars spins down, some of them may be converted into Quark stars.\nThis will add new effect to Neutron stars ‒ all Stars are cheaper, also will increase max level of 'Star system' by +1."
            ],
            cost: [],
            startCost: [4e4, 2e9, 1e50, 1e136],
            scaling: [1e10, 1, 1, 1],
            max: [3, 1, 1, 1],
            maxActive: 3
        }, { //Stage 5
            name: [
                'Hypercompact stellar system'
            ],
            effectText: [
                () => `Super dense core which will allow creation of a new Structure. That Structure will increase Stage reset reward, boost Nebulas and Star clusters, but creating it fully resets ${player.inflation.vacuum ? 'all' : 'Interstellar and Intergalactic'} Stages${player.inflation.vacuum ? ", Energy from creating it won't reset on this or any lower Reset tiers" : player.strangeness[5][3] < 1 ? ", can't be created because 'Gravitational bound' is missing" : ''}.\nThis Research also removes Solar mass and other Remnants requirement from everything in Interstellar.`
            ],
            cost: [],
            startCost: [1e80],
            scaling: [1],
            max: [1],
            maxActive: 1
        }, { //Stage 6
            name: [],
            effectText: [],
            cost: [],
            startCost: [],
            scaling: [],
            max: [],
            maxActive: 0
        }
    ],
    researchesAutoInfo: {
        name: [
            'Upgrade automatization',
            'Element automatization',
            '重置自动化'
        ],
        effectText: [
            () => `Automatically create all ${['Upgrades', 'Stage Researches', 'Special Researches'][Math.min(player.researchesAuto[0], 2)]} from any Stage.`,
            () => 'Elements will no longer require Collapse for activation.\nSecond level will unlock auto creation of Elements.',
            () => { //[2]
                const index = player.inflation.vacuum ? Math.min(player.researchesAuto[2], 3) : Math.min(player.stage.current - 1, 3);
                return `解锁 1 级自动 ${['释能', 'Vaporization', 'Rank', 'Collapse'][player.inflation.vacuum ? (index === 1 ? 2 : index === 2 ? 1 : index) : index]}。`;
            }
        ],
        costRange: [
            [1e13, 2e34, 1e30],
            [136000, 272000],
            [1200, 2400, 7200, 28800]
        ],
        autoStage: [ //Stage to buy from (1 per level)
            [2, 3, 4],
            [1, 1],
            [6, 6, 6, 6]
        ],
        max: [3, 2, 1]
    },
    ASRInfo: { //Auto Structures Research
        name: '自动结构',
        effectText: () => {
            const stageIndex = player.stage.active;
            const index = Math.min(player.ASR[stageIndex] + 1, Math.max(global.ASRInfo.max[stageIndex], 1));
            let unlocked = true;
            if (player.stage.true < 6) {
                if (stageIndex === 3 && player.stage.resets < 5) {
                    if (index === 2) {
                        unlocked = player.upgrades[3][2] === 1 || player.buildings[3][2].trueTotal.moreThan('0');
                    } else if (index === 3) {
                        unlocked = player.upgrades[3][4] === 1 || player.buildings[3][3].trueTotal.moreThan('0');
                    }
                } else if (stageIndex === 5) {
                    if (index === 1) {
                        unlocked = player.milestones[2][0] >= 7;
                    } else if (index === 2) {
                        unlocked = player.milestones[3][0] >= 7;
                    } else if (index === 3) {
                        unlocked = player.milestones[4][1] >= 8;
                    }
                }
            } else if (player.stage.true < 7) {
                if (player.stage.resets < 2 && index === 5) {
                    if (stageIndex === 3) {
                        unlocked = player.upgrades[3][11] === 1 || player.buildings[3][5].trueTotal.moreThan('0');
                    } else if (stageIndex === 4) {
                        unlocked = player.elements[26] >= 1;
                    }
                }
            }
            return `自动购买${unlocked ? global.buildingsInfo.name[stageIndex][index] : '(尚未解锁)'} (算作购买的结构)。\n(${(stageIndex === 5 && index === 3) || stageIndex === 6 ? '对此结构的自动购买没有延迟，并忽略相关设置' : `对此结构的自动购买将等到至少拥有其价格的 ${format(player.stage.true >= 3 ? player.toggles.shop.wait[stageIndex] : 2)} 倍`})`;
        },
        costRange: [ //Random scaling
            [],
            [2000, 8000, 16000, 32000, 56000],
            [1e10, 1e14, 1e18, 1e23, 1e28, 1e30],
            [1e-7, 1e10, 5e29, 2e30, 2e36],
            [1e6, 1e17, 1e28, 1e39, 1e52],
            [1e56, 1e60, 1e100],
            [Infinity]
        ],
        max: [0, 3, 5, 4, 4, 3, 0]
    },
    elementsInfo: {
        name: [
            '[0] 中子素',
            '[1] 氢',
            '[2] 氦',
            '[3] 锂',
            '[4] 铍',
            '[5] 硼',
            '[6] 碳',
            '[7] 氮',
            '[8] 氧',
            '[9] 氟',
            '[10] 氖',
            '[11] 钠',
            '[12] 镁',
            '[13] 铝',
            '[14] 硅',
            '[15] 磷',
            '[16] 硫',
            '[17] 氯',
            '[18] 氩',
            '[19] 钾',
            '[20] 钙',
            '[21] 钪',
            '[22] 钛',
            '[23] 钒',
            '[24] 铬',
            '[25] 锰',
            '[26] 铁',
            '[27] 钴',
            '[28] 镍',
            '[29] 铜',
            '[30] 锌',
            '[31] 镓'
        ],
        effectText: [
            () => `Element with no protons, true head of this table.\nThis one is ${Math.random() < 0.1 ? (Math.random() < 0.1 ? 'an illusive Tetraneutron, or maybe even Pentaneutron, wait where did it go? Was it even there?' : 'a rare Dineutron, but it is already gone...') : 'a simple Mononeutron, it will stay with you for as long as it can.'}`,
            () => `Most basic Element, increases Brown dwarf${player.inflation.vacuum ? ' and Puddles' : ''} production by 2.`,
            () => `Fusion reaction byproduct, makes Interstellar Stars cost scale -${format(0.1)} less.`,
            () => `First metal, Solar mass gain${player.inflation.vacuum ? ' and hardcap delay for Cosmic dust' : ''} per Brown dwarf will be lightly increased.`,
            () => `Brittle earth metal and so is brittle increase to production.\n(${format(1.4)}x boost to all Stars${player.inflation.vacuum ? ' and Cosmic dust' : ''})`,
            () => `A new color, and a new boost to Solar mass gain${player.inflation.vacuum ? ' and delay to Cosmic dust hardcap' : ''} that is based on current Dwarf Stars.`,
            () => `Base for organics, boost from Red giants will be increased by ^${format(calculateEffects.element6())}.`,
            () => "Most abundant Element in atmosphere of some Planets that will allow to have 2 extra levels of 'Star system'.",
            () => `An oxidizing agent that will make Interstellar Stars cost scale even slower. (-${format(0.05)} less)`,
            () => "Highly toxic and reactive, +12 to max level of 'Planetary system'.",
            () => `A noble 2x boost to Solar mass gain${player.inflation.vacuum ? ' and delay to Preons hardcap' : ''}.`,
            () => "Through leaching will get 1 extra level of 'Protoplanetary disk'.",
            () => 'Stars are inside you, as well Neutron stars strength will be increased by log4.',
            () => 'Has a great affinity towards Oxygen and to decrease cost for all Stars by 100.',
            () => `Just another tetravalent metalloid, and so is another ${format(1.4)}x boost to all Stars${player.inflation.vacuum ? ' and Cosmic dust' : ''}.`,
            () => `One of the Fundamentals for Life and to make all Stars boost Solar mass gain${player.inflation.vacuum ? ' and also delay Cosmic dust hardcap' : ''}.`,
            () => "From hot area to increase max level of 'Star system' by 1.",
            () => "Extremely reactive to extend max level of 'Planetary system' by another 24 levels.",
            () => 'Less noble, but Black holes effect will be a little stronger.',
            () => "Don't forget about it and will get 1 free level of 'Planetary system'.\n(Also will make Solar mass effect apply twice to Brown dwarfs)",
            () => "Get stronger with 1 extra level of 'Star system'.",
            () => `A new color and a rare bonus of ^${format(1.1)} to Solar mass effect.`,
            () => 'New alloy that allows Red giants to be added into effective amount of Neutron stars.',
            () => `Catalyst for production of Elements. 'Gamma-ray burst' effect will be increased by Solar mass ^${format(0.1)}.\n(Effect increase: ${format(player.collapse.mass ** 0.1, { padding: true })})`,
            () => { //[24]
                const power = calculateEffects.element24();
                return `No corrosion, only boost to all Stars that is based on unspent Elements ^${format(power)}.\n(Boost to Stars: ${format(new Overlimit(player.buildings[4][0].current).power(power), { padding: true })})`;
            },
            () => "Brittle Element, but not the bonus ‒ 1 more level in 'Star system'.",
            () => `Any further fusion will be an endothermic process. ${player.inflation.vacuum ? `Unlock a new Star type${player.strangeness[5][3] >= 1 ? ' and Intergalactic Stage' : ''}` : 'Enter Intergalactic space'}.\n(${player.stage.true >= 6 || player.strange[0].total >= 1 ? `Current base for Stage reset reward is ${format(calculateEffects.element26(), { padding: true })}, improve it further by producing more Elements this Stage` : 'Can change active Stage from footer, new effect will be added after another Stage reset'})`,
            () => `Combined and ready to make all self-made Red supergiants count as Red giants and improve '[24] Chromium' Element by +^${format(0.01)}.`,
            () => "Slow to react, but will increase max level of 'Star system' by +1.",
            () => `Does not need to be prepared to increase Stage reset reward base by Arithmetic progression with step of ${format(0.01)}.`,
            () => 'First of new Elements to come, increases max allowed Merge resets by current self-made Universes amount.',
            () => 'None.'
        ],
        startCost: [ //New Element cost must be higher than previous one
            0, 1000, 4000, 2e4, 1e5, 1e8, 1e10, 4e11, 8e12, 6e13,
            1e15, 1e20, 1e22, 1e24, 1.4e26, 1e28, 1e30, 1e32, 2e36, 1e38,
            1e39, 1e41, 2e42, 3e43, 4e44, 5e45, 1e48, 1e54, 1e58, 1e140,
            1e200, Infinity
        ]
    },
    strangenessInfo: [
        {} as globalType['strangenessInfo'][0], { //Stage 1
            name: [
                'Fundamental boost',
                'Better improvement',
                'Cheaper Discharge',
                'Free Discharge',
                'Automatic Discharge',
                'Auto Structures',
                'Strange boost',
                'Energy increase',
                'Conservation of Mass',
                'Conservation of Energy'
            ],
            effectText: [
                () => `Boost all Microworld Structures by ${format(player.inflation.vacuum ? 2 : 1.8)}.`,
                () => `Base for 'Improved Tritium' Research will be bigger by +${format(player.inflation.vacuum ? 1.5 : 1)}.\n(Boost from it at current Research level is ${format((calculateEffects.S1Research2(player.strangeness[1][1] + 1) / calculateEffects.S1Research2()) ** player.researches[1][2], { padding: true })})`,
                () => `Discharge goals requirement will scale slower. (-${format(0.5)})\n(Creating this Strangeness will make next Discharge goal to be ${format((getDischargeScale() - 0.5) ** player.discharge.current)} Energy)`,
                () => `Obtain +${format(0.5)} bonus Discharge goals.`,
                () => `Automatically Discharge upon reaching next goal or spending Energy. (Need to be enabled in Settings)${global.strangenessInfo[1].max[4] > 1 ? '\nSecond level will allow to gain Discharge goals based on current Energy instead of needing to reset.' : ''}`,
                () => 'Make auto for all Microworld Structures permanent.',
                () => `Unspent Strange quarks will boost Microworld by improving its Structures.\n(Current effect: ${format(global.strangeInfo.stageBoost[1], { padding: true })})`,
                () => 'Increase Energy gain from creating Preons by +2.',
                () => 'No Mass will be lost when creating Preons, only works when Accretion Stage is unlocked.\nSecond level will disable auto Accretion Structures if Cosmic dust is hardcapped until will have enough Mass for the highest Solar mass conversion, only works if Interstellar Stage is unlocked.',
                () => 'No Energy will be lost when creating Upgrades or Researches, only works when Interstellar Stage is unlocked.'
            ],
            cost: [],
            startCost: [1, 1, 1, 2, 12, 2, 24, 2, 12, 15600],
            scaling: [2.46, 2, 6, 6, 400, 1, 1, 6, 10, 1],
            max: [6, 4, 4, 2, 1, 1, 1, 2, 2, 1],
            maxActive: 7
        }, { //Stage 2
            name: [
                'More Moles',
                'Bigger Puddles',
                'More spread',
                'Cloud density',
                'Automatic Vaporization',
                'Auto Structures',
                'Strange boost',
                'Improved flow',
                'Mechanical spread',
                'Ocean world'
            ],
            effectText: [
                () => `Drops will ${player.inflation.vacuum ? 'improve Tritium' : 'produce'} 2 times more${player.inflation.vacuum ? '' : ' Moles'}.`,
                () => `Puddles will produce ${format(player.inflation.vacuum ? 1.8 : 1.6)} times more Drops.`,
                () => { //[2]
                    let extraText = 'none';
                    if (player.strangeness[2][2] >= 1) { extraText = "max level increased for 'More streams' (+1)"; }
                    if (player.strangeness[2][2] >= 2) { extraText += " and 'Distributary channel' (+1)"; }
                    if (player.strangeness[2][2] >= 3) { extraText += ", a new Upgrade ‒ 'Tsunami'"; }
                    return `Increase max level for one of Researches. Final level will instead unlock a new Upgrade.\n(Current effect: ${extraText})`;
                },
                () => `Decrease amount of Drops required to get a Cloud by ${format(player.inflation.vacuum ? 2.5 : 2)}.`,
                () => `Automatically Vaporize when reached enough boost from new Clouds. (Need to be enabled in Settings)${global.strangenessInfo[2].max[4] > 1 ? `\nSecond level will allow to automatically gain ${format(2.5)}% of Clouds per second.${player.stage.true >= 7 ? ' (Not affected by global speed)' : ''}` : ''}`,
                () => 'Make auto for all Submerged Structures permanent.',
                () => `Unspent Strange quarks will boost Submerged by improving Puddles.\n(Current effect: ${format(global.strangeInfo.stageBoost[2], { padding: true })})`,
                () => `Submerged Structures that improve other Submerged Structures will do it ${format(1.24)} times stonger.\n(Affected Structures are Ponds, Lakes, Seas and Oceans)`,
                () => { //[8]
                    let extraText = 'none';
                    if (player.strangeness[2][8] >= 1) { extraText = "max level increased for 'Stronger surface tension' (+3)"; }
                    if (player.strangeness[2][8] >= 2) { extraText += " and 'Stronger surface stress' (+1)"; }
                    if (player.strangeness[2][8] >= 3) { extraText += ", a new Upgrade ‒ 'Tide'"; }
                    return `Increase max level for one of Researches. Final level will instead unlock an even better new Upgrade.\n(Current effect: ${extraText})`;
                },
                () => `Increase Stage reset reward based on current Cloud amount.\n(Current effect: ${format(calculateEffects.S2Strange9(), { padding: true })})`
            ],
            cost: [],
            startCost: [1, 1, 2, 2, 12, 4, 24, 36, 1200, 9600],
            scaling: [2.46, 2, 3, 3.4, 800, 1, 1, 3.4, 3, 1],
            max: [4, 8, 3, 2, 1, 1, 1, 6, 3, 1],
            maxActive: 7
        }, { //Stage 3
            name: [
                'Faster Accretion',
                'Intense weathering',
                'More levels',
                'Improved Satellites',
                'Automatic Rank',
                'Auto Structures',
                'Upgrade automatization',
                'Strange boost',
                'Mass delay',
                'Rank raise'
            ],
            effectText: [
                () => `Increase strength of Cosmic dust by ${format(1.8)}.`,
                () => `Accretion Structures that produce other Accretion Structures will do it ${format(player.inflation.vacuum ? 1.48 : 1.6)} times faster.\n(Affected Structures are Planetesimals and Protoplanets)`,
                () => { //[2]
                    let extraText = 'none';
                    if (player.strangeness[3][2] >= 1) { extraText = "max level increased for 'Rank boost' (+6)"; }
                    if (player.strangeness[3][2] >= 2) { extraText += " and 'Efficient growth' (+2)"; }
                    if (player.strangeness[3][2] >= 3) { extraText += ", a new Upgrade ‒ 'Hydrostatic equilibrium'"; }
                    return `Increase max level for one of the Rank Researches. Final level will instead unlock a new Upgrade.\n(Current effect: ${extraText})`;
                },
                () => `Satellites will be able to improve remaining ${player.inflation.vacuum ? 'Accretion ' : ''} Structures, but at reduced strength (^${format(player.inflation.vacuum ? 0.1 : 0.2)}).\n(Affected Structures are Cosmic dust and Planetesimals)`,
                () => `Automatically increase Rank when possible. (Need to be enabled in Settings)${global.strangenessInfo[3].max[4] > 1 ? '\nSecond level will make Rank increase use Mass produced this reset instead of current.' : ''}`,
                () => 'Make auto for all Accretion Structures permanent.',
                () => `Always automatically create all ${['Upgrades', 'Stage Researches', 'Special Researches'][Math.min(player.strangeness[3][6], 2)]} from any Stage${!player.inflation.vacuum && player.strangeness[5][3] < 1 && !global.milestonesInfoS6.active[2] ? ' before Intergalactic' : ''}. (Need to be enabled in Settings)`,
                () => `Unspent Strange quarks will boost Accretion by making its Structures cheaper.\n(Current effect: ${format(global.strangeInfo.stageBoost[3], { padding: true })})`,
                () => `Delay Cosmic dust hardcap by ${format(1.4)} per level.`,
                () => 'Unlock a new Accretion Rank to achieve.'
            ],
            cost: [],
            startCost: [1, 2, 2, 24, 12, 4, 4, 24, 9600, 1.8e6],
            scaling: [2, 3.4, 3, 1, 100, 1, 1.74, 1, 2.46, 1],
            max: [8, 4, 3, 1, 1, 1, 3, 1, 6, 1],
            maxActive: 8
        }, { //Stage 4
            name: [
                'Hotter Stars',
                'Cheaper Stars',
                'New Upgrade',
                'Main giants',
                'Automatic Collapse',
                'Auto Structures',
                'Element automatization',
                'Strange boost',
                'Neutronium',
                'Newer Upgrade'
            ],
            effectText: [
                () => `All Stars will produce ${format(1.6)} times more Elements.`,
                () => 'Stars will be 2 times cheaper.',
                () => { //[2]
                    let extraText = 'none';
                    if (player.strangeness[4][2] >= 1) { extraText = "'Planetary nebula' (Stage Research)"; }
                    if (player.strangeness[4][2] >= 2) { extraText += ", 'White dwarfs' (Collapse Research)"; }
                    if (player.strangeness[4][2] >= 3) { extraText += ", 'Helium fusion' (Upgrade)"; }
                    return `Unlock a new Upgrade, its pretty good.\n(Current unlocks: ${extraText})`;
                },
                () => '10% of Brown dwarfs will be able to turn into Red giants after Collapse.',
                () => `Automatically Collapse once reached enough boost. (Need to be enabled in Settings)${global.strangenessInfo[4].max[4] > 1 ? '\nSecond level will allow to automatically gain Star remnants without needing to reset.' : ''}`,
                () => 'Make auto for all Interstellar Structures permanent.',
                () => `Elements will no longer require Collapse for activation${player.inflation.vacuum ? ' and related automatization Research will cost as if its level is 1 less' : ''}.\nSecond level will unlock auto creation of Elements. (${global.strangenessInfo[4].max[6] > 1 ? 'Need to be enabled in settings' : 'Not yet unlocked for Interstellar space'})`,
                () => `Unspent Strange quarks will boost Interstellar by improving all Stars, stronger if '[26] Iron' is created.\n(Current effect: ${format(global.strangeInfo.stageBoost[4], { padding: true })})`,
                () => `Increase effective amount of Neutron stars (doesn't include ones from '[22] Titanium') by 1 + level and improve Neutron stars strength by +^${format(0.125)}.`,
                () => { //[9]
                    let extraText = 'none';
                    if (player.strangeness[4][9] >= 1) { extraText = "'Nucleosynthesis' (Upgrade)"; }
                    if (player.strangeness[4][9] >= 2) { extraText += ", 'Quark-nova' (Collapse Research)"; }
                    if (player.strangeness[4][9] >= 3) { extraText += ", 'Inner Black hole' (Stage Research)"; }
                    return `Unlock yet another an even better new Upgrade.\n(Current unlocks: ${extraText})`;
                }
            ],
            cost: [],
            startCost: [1, 2, 4, 2, 12, 6, 6, 24, 6400, 2e5],
            scaling: [2, 3.4, 3, 6, 1900, 1, 1.74, 1, 2, 3],
            max: [8, 4, 3, 2, 1, 1, 1, 1, 8, 3],
            maxActive: 8
        }, { //Stage 5
            name: [
                'Bigger Structures',
                'Higher density',
                'Strange gain',
                '引力束缚',
                'Automatic Galaxy',
                'Auto Structures',
                'Automatic Stage',
                'Strange boost',
                'Strange growth'
            ],
            effectText: [
                () => `More matter for Accretion (flavor text), first two Intergalactic Structures will be ${format(player.inflation.vacuum ? 1.4 : 1.6)} times stronger.`,
                () => `With higher density first two Intergalactic upgrades will be even stronger. Effects will be increased by ${format(player.inflation.vacuum ? 1.6 : 1.8)}.`,
                () => `Gain ${format(1.4)} times more Strange quarks from any Stage reset.`,
                () => player.inflation.vacuum ? 'Unlock Intergalactic Stage and increase Strange quarks from Stage resets by +1.' : `Will make Intergalactic Stage immune to Collapse reset${!global.milestonesInfoS6.active[2] ? " and allow 'Upgrade automatization' to work within Intergalactic Stage" : ''}.`,
                () => 'Automatically Collapse if will be able to afford new Galaxy and auto Galaxy is enabled. (Also unlocks permanent auto Galaxies for free)',
                () => `Make auto for ${player.strangeness[5][4] >= 1 ? 'all' : 'the first two'} Intergalactic Structures permanent${player.strangeness[5][4] < 1 ? ' and prevent rest from resetting' : ''}.`,
                () => `Automatically trigger Stage reset, doesn't work ${player.inflation.vacuum ? 'inside the Void' : 'for Interstellar Stage until second level'}. (Need to be enabled in Settings)`,
                () => `Unspent Strange quarks will boost Intergalactic by increasing Solar mass gain.\n(Current effect: ${format(global.strangeInfo.stageBoost[5], { padding: true })})`,
                () => 'Unlock another Strange Structure.\n(Click on that Structure to see its effects)'
            ],
            cost: [],
            startCost: [24, 36, 6, 24, 15600, 24, 240, 120, 6000],
            scaling: [2, 2, 3.4, 1, 1, 1, 1, 1, 1],
            max: [8, 8, 2, 1, 1, 1, 1, 1, 1],
            maxActive: 8
        }
    ],
    inflationTreeInfo: {
        name: [
            'Overboost',
            'Global boost',
            'Strange gain',
            'Stranger gain',
            'Unlimited time'
        ],
        effectText: [
            () => 'Boost global speed by 2, but reduce time limit on everything that has it by 4.',
            () => `Unspent Dark matter boost global speed by ${format(calculateEffects.inflation1(), { padding: true })} ⟶ ${format(calculateEffects.inflation1(player.inflation.tree[1] + 1), { padding: true })}.`,
            () => `Gain ${format(1.4)} times more Strange quarks from any Stage reset.`,
            () => "Allows to gain Strangelets until 'Strange growth' Strangeness is created, afterwards it will make 'Strange gain' Strangeness affect Strangelets gain.\nLevel 2 will make 'Strange gain' Inflation affect Strangelets gain, doesn't require 'Strange growth' Strangeness.",
            () => "Remove time limit from Void rewards (Milestones if in false Vacuum) that have already been obtained in previous Vacuum resets.\nFor everything else removes 'Overboost' Inflation time limit decrease."
        ],
        cost: [],
        startCost: [0, 1, 1, 2, 2],
        scaling: [0, 0.75, 0.5, 0, 0],
        max: [1, 4, 6, 2, 1]
    },
    lastUpgrade: [[null, 'upgrades'], [null, 'upgrades'], [null, 'upgrades'], [null, 'upgrades'], [null, 'upgrades'], [null, 'upgrades'], [null, 'upgrades']],
    lastElement: null,
    lastStrangeness: [null, 0],
    lastInflation: null,
    lastMilestone: [null, 0],
    lastChallenge: [null, null],
    milestonesInfo: [
        {} as globalType['milestonesInfo'][0], { //Stage 1
            name: [
                'Fundamental Matter',
                'Energized'
            ],
            needText: [
                () => `Produce at least ${format(global.milestonesInfo[1].need[0])} Quarks this reset.`,
                () => `Have current Energy reach ${format(global.milestonesInfo[1].need[1])}.`
            ],
            rewardText: [
                () => 'Increase Strange quarks from any Stage reset by +1.',
                () => 'Permanent Microworld Stage.'
            ],
            need: [new Overlimit('Infinity'), new Overlimit('Infinity')],
            time: [14400, 14400],
            scaling: [
                [1e152, 1e158, 1e164, 1e170, 1e178, 1e190],
                [23800, 24600, 25800, 27000, 28200, 29600]
            ],
            max: [6, 6]
        }, { //Stage 2
            name: [
                'A Nebula of Drops',
                'Just a bigger Puddle'
            ],
            needText: [
                () => `Produce at least ${format(global.milestonesInfo[2].need[0])} Drops this reset.`,
                () => `Have at least ${format(global.milestonesInfo[2].need[1])} Puddles at same time.`
            ],
            rewardText: [
                () => 'A new Intergalactic Structure. (Nebula)',
                () => 'Permanent Submerged Stage.'
            ],
            need: [new Overlimit('Infinity'), new Overlimit('Infinity')],
            time: [28800, 28800],
            scaling: [
                [1e30, 1e32, 1e34, 1e36, 1e38, 1e40, 1e44],
                [1500, 2300, 3100, 3900, 4700, 5500, 6400]
            ],
            max: [7, 7]
        }, { //Stage 3
            name: [
                'Cluster of Mass',
                'Satellites of Satellites'
            ],
            needText: [
                () => `Produce at least ${format(global.milestonesInfo[3].need[0])} Mass this reset.`,
                () => `Have more or equal to ${format(global.milestonesInfo[3].need[1])} Satellites.`
            ],
            rewardText: [
                () => 'A new Intergalactic Structure. (Star cluster)',
                () => 'Permanent Accretion Stage.'
            ],
            need: [new Overlimit('Infinity'), new Overlimit('Infinity')],
            time: [43200, 43200],
            scaling: [
                [1e32, 1e34, 1e36, 1e38, 1e40, 1e42, 1e45],
                [24, 28, 32, 36, 40, 44, 50]
            ],
            max: [7, 7]
        }, { //Stage 4
            name: [
                'Remnants of past',
                'Supermassive'
            ],
            needText: [
                () => `Produce at least ${format(global.milestonesInfo[4].need[0])} Elements this reset.`,
                () => `Have Solar mass after Collapse reach ${format(global.milestonesInfo[4].need[1])} or more.`
            ],
            rewardText: [
                () => "New Intergalactic themed Strangeness, Milestone and second level of 'Element automatization'.",
                () => 'A new Intergalactic Structure and the final Milestone. (Galaxy)'
            ],
            need: [new Overlimit('Infinity'), new Overlimit('Infinity')],
            time: [57600, 57600],
            scaling: [
                [1e48, 1e49, 1e50, 1e52, 1e54, 1e56, 1e58, 1e60],
                [9000, 12000, 16000, 22000, 30000, 42000, 60000, 84000]
            ],
            max: [8, 8]
        }, { //Stage 5
            name: [
                'Light in the dark',
                'End of Greatness'
            ],
            needText: [
                () => `Have self-made Stars count reach at least ${format(global.milestonesInfo[5].need[0])}.`,
                () => `Have ${format(global.milestonesInfo[5].need[1])} self-made Galaxies or more.`
            ],
            rewardText: [
                () => "Unlock a new Intergalactic Strangeness 'Strange gain' and second level of 'Automatic Stage'.",
                () => "Unlock a new Intergalactic Upgrade 'Galactic Merger'."
            ],
            need: [new Overlimit('Infinity'), new Overlimit('Infinity')],
            time: [3600, 1200],
            scaling: [
                [1460, 1540, 1620, 1700, 1780, 1860, 1940, 2020],
                [1, 2, 4, 6, 10, 14, 18, 22]
            ],
            max: [8, 8]
        }
    ],
    milestonesInfoS6: {
        requirement: [1, 2, 3],
        active: []
    },
    challengesInfo: {
        name: [
            'Void'
        ],
        description: [
            () => `Result of Vacuum Instability, investigate at your own will\n(${player.inflation.vacuum ? 'Entering will force a Stage reset' : 'Requires true Vacuum state to enter'})`
        ],
        effectText: [
            () => {
                const progress = player.challenges.voidCheck;
                let text = `<span class="orangeText">‒ Microworld Structures are 4 times weaker${progress[1] >= 1 ? `\n‒ Discharge base is raised to the root of 2 (^${format(0.5)})` : ''}${progress[1] >= 2 ? '\n‒ Energy gain from creating non Microworld Structures is decreased by 50%' : ''}</span>`;
                if (progress[1] >= 3) { text += `\n\n<span class="blueText">‒ Effective Drops amount is hardcapped at 1\n‒ Puddles are ${format(8000)} times weaker${progress[2] >= 1 ? `\n‒ Clouds gain is decreased by ^${format(0.8)}</span>` : ''}`; }
                if (progress[1] >= 2) { text += `\n\n<span class="grayText">‒ Cosmic dust is softcapped (^${format(0.9)})${progress[3] >= 4 ? `\n‒ Softcap is stronger after reaching 'Jovian planet' Rank (^${format(0.8)})` : ''}</span>`; }
                if (progress[3] >= 5) { text += `\n\n<span class="orchidText">‒ Intestellar Structures are ${format(8000)} times weaker\n‒ Solar mass gain from Stars is decreased by 2\n‒ Solar mass effect is softcapped ^${format(0.2)} after 1</span>`; }
                if (progress[5] >= 1) { text += '\n\n<span class="cyanText">‒ Can\'t create or gain Quasi-stars</span>'; }
                const left = progress[1] < 2 ? 'orange' : progress[3] < 5 ? 'gray' : progress[5] < 1 ? 'orchid' : null;
                if (left !== null) { text += `\n<span class="${left}Text">More will be shown after getting further into the Void</span>`; }
                return text;
            }
        ],
        needText: [
            [
                [], [
                    () => 'Perform Discharge',
                    () => "Get first level of 'Accretion'",
                    () => "Get second level of 'Accretion'"
                ], [
                    () => 'Have more than 0 Clouds',
                    () => `Have more than ${format(1e4)} Clouds`
                ], [
                    () => "Reach 'Meteoroid' Rank",
                    () => "Reach 'Asteroid' Rank",
                    () => "Reach 'Planet' Rank",
                    () => "Reach 'Jovian planet' Rank",
                    () => "Reach 'Protostar' Rank"
                ], [
                    () => 'Cause the Collapse',
                    () => 'Get first Red giant',
                    () => 'Get first Neutron star',
                    () => 'Get first Black hole'
                ], [
                    () => 'Unlock Intergalactic',
                    () => 'Create a Galaxy'
                ]
            ]
        ],
        rewardText: [
            [
                [],
                ["'Energy increase' (Microworld)", "'Conservation of Mass' (Microworld)", "'Improved flow' (Submerged)"],
                ["'Mechanical spread' (Submerged)", "'Ocean world' (Submerged)"],
                ['Multiple max level increases', 'Multiple max level increases', 'Multiple max level increases', 'Multiple max level increases', "'Strange growth' (Intergalactic)"],
                ['Max level increased for Auto resets', "'Conservation of Energy' (Microworld)", "'Neutronium' (Interstellar)", "'Mass delay' (Accretion)"],
                ["'Newer Upgrade' (Interstellar)", "'Rank raise' (Accretion)"]
            ]
        ],
        color: [
            'darkviolet'
        ]
    },
    historyStorage: {
        stage: [],
        vacuum: []
    }
};

//Math.log extension for any base
export const logAny = (number: number, base: number) => Math.log(number) / Math.log(base);

/** Not for deep copy, works on Overlimit, but not prefered */
export const cloneArray = <ArrayClone extends Array<number | string | boolean | null | undefined>>(array: ArrayClone) => array.slice(0) as ArrayClone;
//Actual type is any[], it's because TS is dumb; [...array] will be better after ~>10000 keys

/** For non deep clone use { ...object } or cloneArray when possible */
export const deepClone = <CloneType>(toClone: CloneType): CloneType => {
    if (typeof toClone !== 'object' || toClone === null) { return toClone; }

    let value: any;
    if (Array.isArray(toClone)) {
        if (toClone instanceof Overlimit) { return new Overlimit(toClone) as CloneType; }

        value = []; //Faster this way
        for (let i = 0; i < toClone.length; i++) { value.push(deepClone(toClone[i])); }
    } else {
        value = {};
        for (const check in toClone) { value[check] = deepClone(toClone[check]); }
    }
    return value;
};

/** Does not clone given value */
export const createArray = <startValue extends number | string | boolean | null | undefined>(length: number, value: startValue) => {
    const array = [];
    for (let i = 0; i < length; i++) {
        array.push(value);
    }
    return array as startValue[];
};

for (let s = 0; s < global.buildingsInfo.startCost.length; s++) {
    global.buildingsInfo.producing[s] = [];
    for (let i = 0; i < global.buildingsInfo.startCost[s].length; i++) {
        global.buildingsInfo.producing[s].push(new Overlimit('0'));
    }
}
for (const upgradeType of ['researches', 'researchesExtra', 'strangeness'] as const) {
    const pointer = global[`${upgradeType}Info`];
    for (let s = 1; s < pointer.length; s++) {
        pointer[s].cost = cloneArray(pointer[s].startCost);
    }
}
global.inflationTreeInfo.cost = cloneArray(global.inflationTreeInfo.startCost);

Object.assign(player, {
    upgrades: [
        [],
        createArray(global.upgradesInfo[1].startCost.length, 0),
        createArray(global.upgradesInfo[2].startCost.length, 0),
        createArray(global.upgradesInfo[3].startCost.length, 0),
        createArray(global.upgradesInfo[4].startCost.length, 0),
        createArray(global.upgradesInfo[5].startCost.length, 0),
        createArray(global.upgradesInfo[6].startCost.length, 0)
    ],
    researches: [
        [],
        createArray(global.researchesInfo[1].startCost.length, 0),
        createArray(global.researchesInfo[2].startCost.length, 0),
        createArray(global.researchesInfo[3].startCost.length, 0),
        createArray(global.researchesInfo[4].startCost.length, 0),
        createArray(global.researchesInfo[5].startCost.length, 0),
        createArray(global.researchesInfo[6].startCost.length, 0)
    ],
    researchesExtra: [
        [],
        createArray(global.researchesExtraInfo[1].startCost.length, 0),
        createArray(global.researchesExtraInfo[2].startCost.length, 0),
        createArray(global.researchesExtraInfo[3].startCost.length, 0),
        createArray(global.researchesExtraInfo[4].startCost.length, 0),
        createArray(global.researchesExtraInfo[5].startCost.length, 0),
        createArray(global.researchesExtraInfo[6].startCost.length, 0)
    ],
    researchesAuto: createArray(global.researchesAutoInfo.costRange.length, 0),
    ASR: createArray(global.ASRInfo.costRange.length, 0),
    maxASR: createArray(global.ASRInfo.costRange.length, 0),
    elements: createArray(global.elementsInfo.startCost.length, 0),
    strangeness: [
        [],
        createArray(global.strangenessInfo[1].startCost.length, 0),
        createArray(global.strangenessInfo[2].startCost.length, 0),
        createArray(global.strangenessInfo[3].startCost.length, 0),
        createArray(global.strangenessInfo[4].startCost.length, 0),
        createArray(global.strangenessInfo[5].startCost.length, 0)
    ],
    milestones: [
        [],
        createArray(global.milestonesInfo[1].need.length, 0),
        createArray(global.milestonesInfo[2].need.length, 0),
        createArray(global.milestonesInfo[3].need.length, 0),
        createArray(global.milestonesInfo[4].need.length, 0),
        createArray(global.milestonesInfo[5].need.length, 0)
    ]
});
Object.assign(player.toggles, {
    normal: createArray(document.getElementsByClassName('toggleNormal').length, false),
    confirm: createArray(document.getElementsByClassName('toggleConfirm').length, 'Safe'),
    buildings: [
        [],
        createArray(player.buildings[1].length, false),
        createArray(player.buildings[2].length, false),
        createArray(player.buildings[3].length, false),
        createArray(player.buildings[4].length, false),
        createArray(player.buildings[5].length, false),
        createArray(player.buildings[6].length, false)
    ],
    hover: createArray(document.getElementsByClassName('toggleHover').length, false),
    max: createArray(document.getElementsByClassName('toggleMax').length, false),
    auto: createArray(document.getElementsByClassName('toggleAuto').length, false)
});
player.inflation.tree = createArray(global.inflationTreeInfo.startCost.length, 0);
player.toggles.normal[1] = true;

//player.example = playerStart.example; Is not allowed (if example is an array or object), instead iterate or create clone
export const playerStart = deepClone(player);

export const updatePlayer = (load: playerType): string => {
    if (load['player' as keyof unknown] !== undefined) { load = load['player' as keyof unknown]; }
    if (load.vaporization === undefined) { throw new ReferenceError('This save file is not from this game or too old'); }
    if (load.version === undefined) { load.version = '0.0.0'; }
    prepareVacuum(Boolean(load.inflation?.vacuum)); //Only to set starting buildings values

    const oldVersion = load.version;
    if (oldVersion !== playerStart.version) {
        if (load.version === '0.0.0') {
            load.version = 'v0.0.1';
            load.researchesExtra = []; //Required for v0.0.9
        }
        if (load.version === 'v0.0.1') {
            load.version = 'v0.0.2';
            load.stage.resets = load.stage.current - 1;
        }
        if (load.version === 'v0.0.2') {
            load.version = 'v0.0.3';
            load.accretion = deepClone(playerStart.accretion);
        }
        if (load.version === 'v0.0.3' || load.version === 'v0.0.4') {
            load.version = 'v0.0.5';
            load.elements = cloneArray(playerStart.elements);
            load.collapse = deepClone(playerStart.collapse);
            delete load['energy' as keyof unknown];
            delete load['buyToggle' as keyof unknown];
        }
        if (load.version === 'v0.0.5' || load.version === 'v0.0.6') {
            load.version = 'v0.0.7';
            load.strange = deepClone(playerStart.strange);
            load.strangeness = deepClone(playerStart.strangeness);
        }
        if (load.version === 'v0.0.7' || load.version === 'v0.0.8') {
            load.version = 'v0.0.9';
            load.stage.active = Math.min(load.stage.current, 4);
            const a = load.stage.active;
            const oldB = load.buildings as unknown as playerType['buildings'][0];
            load.buildings = deepClone(playerStart.buildings);
            load.buildings[a] = oldB;
            const oldU = load.upgrades as unknown as playerType['upgrades'][0];
            load.upgrades = deepClone(playerStart.upgrades);
            load.upgrades[a] = oldU;
            const oldR = load.researches as unknown as playerType['researches'][0];
            load.researches = deepClone(playerStart.researches);
            load.researches[a] = oldR;
            const oldE = load.researchesExtra as unknown as playerType['researchesExtra'][0];
            load.researchesExtra = deepClone(playerStart.researchesExtra);
            load.researchesExtra[a] = oldE;
            if (load.strangeness.length < 5) { load.strangeness.unshift([]); }
            load.ASR = cloneArray(playerStart.ASR);
            load.milestones = deepClone(playerStart.milestones);
        }
        if (load.version === 'v0.0.9' || load.version === 'v0.1.0') {
            load.version = 'v0.1.1';
            load.discharge.energy = 0;
            load.collapse.massMax = load.collapse.mass;
            delete load.discharge['energyCur' as keyof unknown];
        }
        if (load.version === 'v0.1.1') {
            load.version = 'v0.1.2';
            for (let s = 1; s <= 5; s++) {
                for (let i = 0; i < load.buildings[s].length; i++) {
                    const building = load.buildings[s][i];
                    building.current = new Overlimit(building.current);
                    building.total = new Overlimit(building.total);
                    building.trueTotal = new Overlimit(building.total); //Intentional
                }
            }
            if (load.strange[0]['true' as keyof unknown] !== undefined) { load.strange[0].current = load.strange[0]['true' as 'current']; }
            load.strange[0].total = load.strange[0].current;
            load.inflation = deepClone(playerStart.inflation);
            delete load.vaporization['current' as keyof unknown];
            delete load.strange[0]['true' as keyof unknown];
        }
        if (load.version === 'v0.1.2') {
            load.version = 'v0.1.3';
            load.stage.time = 0;
            load.inflation.age = 0;
            load.discharge.energyMax = load.discharge.energy;
            load.vaporization.cloudsMax = new Overlimit(load.vaporization.clouds);
        }
        if (load.version === 'v0.1.3' || load.version === 'v0.1.4' || load.version === 'v0.1.5') {
            load.version = 'v0.1.6';
            load.collapse.show = 0;
            load.challenges = deepClone(playerStart.challenges);
            delete load.time['disabled' as keyof unknown];
            delete load.discharge['unlock' as keyof unknown];
            delete load.collapse['disabled' as keyof unknown];
            delete load.collapse['inputM' as keyof unknown];
            delete load.collapse['inputS' as keyof unknown];
        }
        if (load.version === 'v0.1.6' || load.version === 'v0.1.7') {
            load.version = 'v0.1.8';
            load.time.online = load.inflation.age;
            load.time.universe = load.inflation.age;
            load.time.stage = load.stage.time;
            if (load.buildings[5].length > 4) { load.buildings[5].length = 4; }
            delete load['saveUpdate016' as keyof unknown];
            delete load.accretion['input' as keyof unknown];
            delete load.collapse['elementsMax' as keyof unknown];
        }
        if (load.version === 'v0.1.8') {
            load.version = 'v0.1.9';
            load.toggles = deepClone(playerStart.toggles);
            load.researchesAuto = cloneArray(playerStart.researchesAuto);
            delete load.discharge['bonus' as keyof unknown];
        }
        if (load.version === 'v0.1.9') {
            load.version = 'v0.2.0';
            load.stage.peak = 0;
            load.vaporization.input = cloneArray(playerStart.vaporization.input);
            load.time.export = cloneArray(playerStart.time.export);
            load.history = deepClone(playerStart.history);
            load.events = cloneArray(playerStart.events);
            load.fileName = playerStart.fileName;
            delete load['event' as keyof unknown];
            delete load['separator' as keyof unknown];
            delete load['intervals' as keyof unknown];
            delete load.stage['best' as keyof unknown];
            delete load.stage['export' as keyof unknown];

            /* Can be removed eventually */
            load.strangeness[1].splice(1, 0, load.strangeness[1].splice(5, 1)[0]);
            load.strangeness[1].splice(7, 1);
            load.strangeness[1].splice(4, 1);
            load.strangeness[2].splice(8, 1);
            load.strangeness[2].splice(6, 1);
            load.strangeness[3].splice(10, 1);
            load.strangeness[3].splice(8, 1);
            load.strangeness[4].splice(6, 0, load.strangeness[4].splice(4, 1)[0]);
            load.strangeness[4].splice(9, 1);
            load.strangeness[4].splice(7, 1);
            load.strangeness[5].splice(8, 1);
            load.strangeness[5].splice(6, 1);
            if (load.inflation.vacuum) { load.milestones = deepClone(playerStart.milestones); }
            delete load.toggles.shop['howMany' as keyof unknown];
        }
        if (load.version === 'v0.2.0') {
            load.version = 'v0.2.1';
            load.time.offline = 0;
            load.stage.input = cloneArray(playerStart.stage.input);
            load.merge = deepClone(playerStart.merge);
            load.cosmon = deepClone(playerStart.cosmon);
            load.inflation.resets = load.inflation.vacuum ? 1 : 0;
            load.inflation.tree = cloneArray(playerStart.inflation.tree);
            load.buildings[6] = deepClone(playerStart.buildings[6]);
            load.upgrades[6] = cloneArray(playerStart.upgrades[6]);
            load.researches[6] = cloneArray(playerStart.researches[6]);
            load.researchesExtra[6] = cloneArray(playerStart.researchesExtra[6]);
            load.collapse.input = cloneArray(playerStart.collapse.input);
            if (load.challenges.active === -1) { load.challenges.active = null; }
            load.challenges.voidCheck = cloneArray(load.challenges.void);
            load.history.vacuum = deepClone(playerStart.history.vacuum);
            for (let s = 1; s <= 5; s++) {
                for (let i = 0; i < load.buildings[s].length; i++) {
                    delete load.buildings[s][i]['highest' as keyof unknown];
                }
            }

            /* Can be removed eventually */
            load.discharge.energy = Math.round(load.discharge.energy);
            load.toggles.normal = cloneArray(playerStart.toggles.normal);
            load.toggles.buildings[6] = cloneArray(playerStart.toggles.buildings[6]);
            load.strangeness[5].splice(6, 0, load.strangeness[5].splice(2, 1)[0]);
            load.strangeness[5].splice(3, 0, load.strangeness[5].splice(1, 1)[0]);
            load.strangeness[5].splice(0, 1);
            load.strangeness[5].splice(4, 0, 0);
        }

        if (load.version !== playerStart.version) {
            throw new ReferenceError('Save file version is higher than game version');
        }
    }

    //Move into v0.2.2
    if (load.collapse.show === 0) { load.collapse.show = load.elements.findLastIndex((e) => e > 0); }
    if (load.collapse.points === undefined) { load.collapse.points = []; }

    for (let s = 1; s <= 6; s++) {
        for (let i = Math.min(load.buildings[s].length, global.buildingsInfo.maxActive[s]); i < playerStart.buildings[s].length; i++) {
            load.buildings[s][i] = deepClone(playerStart.buildings[s][i]);
        }
        for (let i = load.toggles.buildings[s].length; i < playerStart.toggles.buildings[s].length; i++) {
            load.toggles.buildings[s][i] = false;
        }
        if (isNaN(load.toggles.shop.wait[s])) {
            load.toggles.shop.wait[s] = 2;
        }

        for (let i = load.upgrades[s].length; i < playerStart.upgrades[s].length; i++) {
            load.upgrades[s][i] = 0;
        }
        for (let i = load.researches[s].length; i < playerStart.researches[s].length; i++) {
            load.researches[s][i] = 0;
        }
        for (let i = load.researchesExtra[s].length; i < playerStart.researchesExtra[s].length; i++) {
            load.researchesExtra[s][i] = 0;
        }
        if (load.ASR[s] === undefined) {
            load.ASR[s] = 0;
        }

        if (s === 6) { continue; }
        for (let i = Math.min(load.strangeness[s].length, global.strangenessInfo[s].maxActive); i < playerStart.strangeness[s].length; i++) {
            load.strangeness[s][i] = 0;
        }
        for (let i = load.milestones[s].length; i < playerStart.milestones[s].length; i++) {
            load.milestones[s][i] = 0;
        }
    }
    for (let i = load.strange.length; i < playerStart.strange.length; i++) {
        load.strange[i] = deepClone(playerStart.strange[i]);
    }

    for (let i = load.researchesAuto.length; i < playerStart.researchesAuto.length; i++) {
        load.researchesAuto[i] = 0;
    }
    for (let i = load.elements.length; i < playerStart.elements.length; i++) {
        load.elements[i] = 0;
    }
    for (let i = load.inflation.tree.length; i < playerStart.inflation.tree.length; i++) {
        load.inflation.tree[i] = 0;
    }

    for (let i = load.toggles.normal.length; i < playerStart.toggles.normal.length; i++) {
        load.toggles.normal[i] = playerStart.toggles.normal[i];
    }
    for (let i = load.toggles.confirm.length; i < playerStart.toggles.confirm.length; i++) {
        load.toggles.confirm[i] = 'Safe';
    }
    for (let i = load.toggles.hover.length; i < playerStart.toggles.hover.length; i++) {
        load.toggles.hover[i] = false;
    }
    for (let i = load.toggles.max.length; i < playerStart.toggles.max.length; i++) {
        load.toggles.max[i] = false;
    }
    for (let i = load.toggles.auto.length; i < playerStart.toggles.auto.length; i++) {
        load.toggles.auto[i] = false;
    }

    /* Restore data post JSON parse */
    load.fileName = new TextDecoder().decode(Uint8Array.from(load.fileName, (c) => c.codePointAt(0) as number));
    load.vaporization.clouds = new Overlimit(load.vaporization.clouds);
    load.vaporization.cloudsMax = new Overlimit(load.vaporization.cloudsMax);
    for (let s = 1; s < load.buildings.length; s++) {
        for (let i = 0; i < load.buildings[s].length; i++) {
            const building = load.buildings[s][i];
            building.current = new Overlimit(building.current);
            building.total = new Overlimit(building.total);
            building.trueTotal = new Overlimit(building.trueTotal);
        }
    }
    Object.assign(player, load);

    /* Final preparations and fixes */
    global.debug.errorID = true;
    global.debug.errorQuery = true;
    global.debug.errorGain = true;
    global.debug.historyStage = null;
    global.debug.historyVacuum = null;
    const { buildings, strangeness, researchesAuto } = player;
    const { active: activeMilestone, requirement } = global.milestonesInfoS6;
    const stageHistory = player.history.stage;

    const universes = buildings[6][1].current;
    for (let i = 0; i < requirement.length; i++) {
        activeMilestone[i] = universes.moreOrEqual(requirement[i]);
    }

    global.vaporizationInfo.trueResearch0 = 0;
    global.vaporizationInfo.trueResearch1 = 0;
    global.vaporizationInfo.trueResearchRain = 0;
    if (player.challenges.active === 0) { buildings[4][5].true = 0; }
    global.collapseInfo.trueStars = buildings[4][1].true + buildings[4][2].true + buildings[4][3].true + buildings[4][4].true + buildings[4][5].true;
    global.collapseInfo.pointsLoop = 0;
    const points = player.collapse.points;
    for (let i = 0; i < points.length; i++) {
        if (points[i] > 40) {
            points.length = i;
            break;
        }
    }
    global.historyStorage.stage = stageHistory.list;
    global.historyStorage.vacuum = player.history.vacuum.list;
    if (player.elements[26] >= 1 && player.stage.current < 5) { player.elements[26] = 0; }
    if (player.inflation.vacuum) {
        buildings[2][0].current.setValue(buildings[1][5].current).divide('6.02214076e23');
        buildings[3][0].current.setValue(buildings[1][0].current).multiply('1.78266192e-33');
        player.events[0] = true; //To reduce checks
    } else {
        for (let s = 2; s <= 5; s++) { global.dischargeInfo.energyStage[s] = 0; }
        if (buildings[2][1].current.lessOrEqual('0')) { buildings[2][0].current.max('2.7753108348135e-3'); }
        if (player.accretion.rank === 0) { buildings[3][0].current.setValue('5.9722e27'); }
    }
    if (!player.events[1]) { player.events[1] = player.stage.true >= 7; }
    if (activeMilestone[0]) { strangeness[1][8] = 2; }
    if (activeMilestone[1]) { strangeness[5][4] = 1; }
    if (activeMilestone[2]) {
        strangeness[3][6] = 3;
        strangeness[4][6] = 2;
    }
    researchesAuto[0] = Math.max(strangeness[3][6], researchesAuto[0]);
    researchesAuto[1] = Math.max(strangeness[4][6], researchesAuto[1]);
    global.strangeInfo.bestHistoryRate = stageHistory.best[1] / stageHistory.best[0];

    for (let s = 1; s < 6; s++) {
        const strangeness = player.strangeness[s];
        const strangenessMax = global.strangenessInfo[s].max;
        if (activeMilestone[1]) { strangeness[5] = 1; }
        for (let i = 0; i < global.strangenessInfo[s].maxActive; i++) {
            calculateMaxLevel(i, s, 'strangeness');
            if (strangeness[i] > strangenessMax[i]) {
                strangeness[i] = strangenessMax[i];
                visualUpdateResearches(i, s, 'strangeness');
            }
        }
        for (let i = 0; i < playerStart.milestones[s].length; i++) {
            assignMilestoneInformation(i, s);
        }

        const extra = player.researchesExtra[s];
        const extraMax = global.researchesExtraInfo[s].max;
        for (let i = 0; i < global.researchesExtraInfo[s].maxActive; i++) {
            calculateMaxLevel(i, s, 'researchesExtra');
            if (extra[i] > extraMax[i]) {
                extra[i] = extraMax[i];
            }
        }
        const researches = player.researches[s];
        const researchesMax = global.researchesInfo[s].max;
        for (let i = 0; i < global.researchesInfo[s].maxActive; i++) {
            calculateMaxLevel(i, s, 'researches');
            if (researches[i] > researchesMax[i]) {
                researches[i] = researchesMax[i];
            }
        }
        calculateMaxLevel(0, s, 'ASR');
        if (strangeness[5] >= 1) { player.ASR[s] = s === 5 && strangeness[4] < 1 ? Math.max(2, player.ASR[5]) : global.ASRInfo.max[s]; }
    }
    {
        const autoMax = global.researchesAutoInfo.max;
        for (let i = 0; i < playerStart.researchesAuto.length; i++) {
            calculateMaxLevel(i, 0, 'researchesAuto');
            if (i !== 2) { continue; }
            if (researchesAuto[i] > autoMax[i]) {
                researchesAuto[i] = autoMax[i];
                visualUpdateResearches(i, 0, 'researchesAuto');
            }
        }
    }

    global.lastChallenge = [player.challenges.active, null];
    global.lastInflation = null;
    getId('inflationText').textContent = 'Hover to see.';
    getId('inflationEffect').textContent = 'Hover to see.';
    getId('inflationCost').textContent = 'Cosmon.';
    for (let i = 0; i < playerStart.inflation.tree.length; i++) { calculateResearchCost(i, 0, 'inflation'); }

    assignBuildingInformation();
    assignStrangeInfo[1]();
    assignStrangeInfo[0]();
    assignPuddles();
    assignMaxRank();
    assignTrueEnergy(); //Also assignEnergyArray();

    autoUpgradesSet('all');
    autoResearchesSet('researches', 'all');
    autoResearchesSet('researchesExtra', 'all');
    autoElementsSet();

    /* Finish visuals */
    (getId('saveFileNameInput') as HTMLInputElement).value = player.fileName;
    (getId('stageInput') as HTMLInputElement).value = format(player.stage.input[0], { type: 'input' });
    (getId('stageInputTime') as HTMLInputElement).value = format(player.stage.input[1], { type: 'input' });
    (getId('vaporizationInput') as HTMLInputElement).value = format(player.vaporization.input[0], { type: 'input' });
    (getId('vaporizationInputMax') as HTMLInputElement).value = format(player.vaporization.input[1], { type: 'input' });
    (getId('collapseInput') as HTMLInputElement).value = format(player.collapse.input[0], { type: 'input' });
    (getId('collapseInputWait') as HTMLInputElement).value = format(player.collapse.input[1], { type: 'input' });
    (getId('stageHistorySave') as HTMLInputElement).value = `${stageHistory.input[0]}`;
    (getId('stageHistoryShow') as HTMLInputElement).value = `${stageHistory.input[1]}`;
    (getId('vacuumHistorySave') as HTMLInputElement).value = `${player.history.vacuum.input[0]}`;
    (getId('vacuumHistoryShow') as HTMLInputElement).value = `${player.history.vacuum.input[1]}`;
    for (let i = 0; i < playerStart.toggles.normal.length; i++) { toggleSwap(i, 'normal'); }
    for (let i = 0; i < playerStart.toggles.confirm.length; i++) { toggleConfirm(i); }
    for (let i = 0; i < playerStart.toggles.hover.length; i++) { toggleSwap(i, 'hover'); }
    for (let i = 0; i < playerStart.toggles.max.length; i++) { toggleSwap(i, 'max'); }
    for (let i = 0; i < playerStart.toggles.auto.length; i++) { toggleSwap(i, 'auto'); }
    (getId('buyAnyInput') as HTMLInputElement).value = format(player.toggles.shop.input, { type: 'input' });
    updateCollapsePointsText();

    return oldVersion;
};
