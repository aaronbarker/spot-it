var randomizeCards = false;
var randomizeItems = false;
var runGame = true;
var words = ["a","b","c"]; // 3 words (good)
// var words = ["a","b","c","d"]; // 4 words (bad)
// var words = ["Aaron","Dallin","Daniel","Kaylene","Perry","Grandma","Fred"]; // 7 words (good)
// var words = ["Aardvark","Buffalo","Cow","Doc","Elephant","Fox","Gopher","Hawk","Ibex","Joey","Kangaroo","Lion","Mouse"]; // 13 words (good)




var words = [
    'http://photos.smugmug.com/photos/304577222_Qn7CQRf-Ti.jpg',
    'http://photos.smugmug.com/photos/403266789_mCSMHRD-Ti.jpg',
    'http://photos.smugmug.com/photos/304574382_FxSDMkH-Ti.jpg',
    'http://photos.smugmug.com/photos/304575261_p3D5j2V-Ti.jpg',
    'http://photos.smugmug.com/photos/359965375_qTRmwzS-Ti.jpg',
    'http://photos.smugmug.com/photos/359969600_nRwXqXM-Ti.jpg',
    'http://photos.smugmug.com/photos/2455421437_jBwR3v4-Ti.jpg',
    'http://photos.smugmug.com/photos/1220410635_MpMgg8s-Ti.jpg',
    'http://photos.smugmug.com/photos/1122710934_cRdphsk-Ti.jpg',
    'http://photos.smugmug.com/photos/131782448_Fqc3JCw-Ti.jpg',
    'http://photos.smugmug.com/photos/304571981_qGFWfS8-Ti.jpg',
    'http://photos.smugmug.com/photos/401587434_GR3DFB5-Ti.jpg',
    'http://photos.smugmug.com/photos/580400758_z2GZkJ8-Ti.jpg',
    'http://photos.smugmug.com/photos/1562689053_Q43Zz2X-Ti.jpg',
    'http://photos.smugmug.com/photos/243636674_Pr3vLgr-Ti.jpg',
    'http://photos.smugmug.com/photos/580383672_FcBsnBQ-Ti.jpg',
    'http://photos.smugmug.com/photos/580386980_WLTF9b4-Ti.jpg',
    'http://photos.smugmug.com/photos/1257250439_LBrVLtD-Ti.jpg',
    'http://photos.smugmug.com/photos/131783235_g8S24Xv-Ti.jpg',
    'http://photos.smugmug.com/photos/132067495_hSDw82D-Ti.jpg',
    'http://photos.smugmug.com/photos/144710668_knmqVdW-Ti.jpg',
    'http://photos.smugmug.com/photos/634102549_C38Sf6j-Ti.jpg',
    'http://photos.smugmug.com/photos/304573075_rwfCQTF-Ti.jpg',
    'http://photos.smugmug.com/photos/580400351_Q5vwk7F-Ti.jpg',
    'http://photos.smugmug.com/photos/580401707_QdJ7wsm-Ti.jpg',
    'http://photos.smugmug.com/photos/1257250132_mpnKXwZ-Ti.jpg',
    'http://photos.smugmug.com/photos/243631534_mSd3CKV-Ti.jpg',
    'http://photos.smugmug.com/photos/243635385_Xvf535r-Ti.jpg',
    'http://photos.smugmug.com/photos/401578633_W2tdPGP-Ti.jpg',
    'http://photos.smugmug.com/photos/401580975_x4JgJpV-Ti.jpg',
    'http://photos.smugmug.com/photos/1122711641_ZmQ9Rm2-Ti.jpg',
    // 'http://photos.smugmug.com/photos/243643072_tF8B272-Ti.jpg',
    // 'http://photos.smugmug.com/photos/131782866_v86pwR3-Ti.jpg',
    // 'http://photos.smugmug.com/photos/144699279_MszBSj4-Ti.jpg',
    // 'http://photos.smugmug.com/photos/359945805_vt3pT5H-Ti.jpg',
    // 'http://photos.smugmug.com/photos/359971702_r4vPc9g-Ti.jpg',
    // 'http://photos.smugmug.com/photos/401589272_HHLxVqr-Ti.jpg',
    // 'http://photos.smugmug.com/photos/580401883_43t9qPx-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2544855897_vtCJzJS-Ti.jpg',
    // 'http://photos.smugmug.com/photos/132071734_4cSHSft-Ti.jpg',
    // 'http://photos.smugmug.com/photos/133211766_HDKK5KF-Ti.jpg',
    // 'http://photos.smugmug.com/photos/304576148_xLhkZcH-Ti.jpg',
    // 'http://photos.smugmug.com/photos/635273000_bgvHvZJ-Ti.jpg',
    // 'http://photos.smugmug.com/photos/1220410064_8CPnKds-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2455420987_5dNCxSx-Ti.jpg',
    // 'http://photos.smugmug.com/photos/3176076557_Vj76Qhk-Ti.jpg',
    // 'http://photos.smugmug.com/photos/133211593_GHdQ9Wb-Ti.jpg',
    // 'http://photos.smugmug.com/photos/304579509_tShBF9R-Ti.jpg',
    // 'http://photos.smugmug.com/photos/359943832_pswZFMz-Ti.jpg',
    // 'http://photos.smugmug.com/photos/359953381_qfJKd7B-Ti.jpg',
    // 'http://photos.smugmug.com/photos/359968395_WJwCbFN-Ti.jpg',
    // 'http://photos.smugmug.com/photos/401585054_KgpjV4h-Ti.jpg',
    // 'http://photos.smugmug.com/photos/131776376_St2Dk9p-Ti.jpg',
    // 'http://photos.smugmug.com/photos/144704753_4nCJPSG-Ti.jpg',
    // 'http://photos.smugmug.com/photos/144708886_wQ2MSNL-Ti.jpg',
    // 'http://photos.smugmug.com/photos/243632662_hzGDSk5-Ti.jpg',
    // 'http://photos.smugmug.com/photos/243633998_mjJFwNR-Ti.jpg',
    // 'http://photos.smugmug.com/photos/243637880_qWVhwFt-Ti.jpg',
    // 'http://photos.smugmug.com/photos/580384501_VCVgMBF-Ti.jpg',
    // 'http://photos.smugmug.com/photos/580386572_r6PkJCj-Ti.jpg',
    // 'http://photos.smugmug.com/photos/580399888_k2szmDx-Ti.jpg',
    // 'http://photos.smugmug.com/photos/635272155_dC3mxLH-Ti.jpg',
    // 'http://photos.smugmug.com/photos/1122731453_tmzv9PQ-Ti.jpg',
    // 'http://photos.smugmug.com/photos/1220410777_3WPSF8K-Ti.jpg',
    // 'http://photos.smugmug.com/photos/1517506324_JcDZdqJ-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2544858108_WkH2nJk-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2878142096_dMRKG7T-Ti.jpg',
    // 'http://photos.smugmug.com/photos/132067093_x2wsF4P-Ti.jpg',
    // 'http://photos.smugmug.com/photos/144698745_c5GHz49-Ti.jpg',
    // 'http://photos.smugmug.com/photos/206364607_NrsbdHW-Ti.jpg',
    // 'http://photos.smugmug.com/photos/359951837_rhVRH8b-Ti.jpg',
    // 'http://photos.smugmug.com/photos/359966942_77nn5R6-Ti.jpg',
    // 'http://photos.smugmug.com/photos/401582841_DwWw8QX-Ti.jpg',
    // 'http://photos.smugmug.com/photos/463806252_VxgcJkR-Ti.jpg',
    // 'http://photos.smugmug.com/photos/580385759_988bmhN-Ti.jpg',
    // 'http://photos.smugmug.com/photos/635275578_j5JQGb4-Ti.jpg',
    // 'http://photos.smugmug.com/photos/1072459553_nBNLtQx-Ti.jpg',
    // 'http://photos.smugmug.com/photos/1122711220_n8dcrbk-Ti.jpg',
    // 'http://photos.smugmug.com/photos/1122731111_6RBw4c3-Ti.jpg',
    // 'http://photos.smugmug.com/photos/1266064857_7cBT84h-Ti.jpg',
    // 'http://photos.smugmug.com/photos/1507210214_7Bt9hr5-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2152507427_vxVq8Vc-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2152525449_2wSrhXF-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2544860439_qQwPVx3-Ti.jpg',
    // 'http://photos.smugmug.com/photos/3176061430_MGpSKSS-Ti.jpg',
    // 'http://photos.smugmug.com/photos/3176071063_CBFkNPV-Ti.jpg',
    // 'http://photos.smugmug.com/photos/206363240_wCx65vv-Ti.jpg',
    // 'http://photos.smugmug.com/photos/206363846_6KzK399-Ti.jpg',
    // 'http://photos.smugmug.com/photos/206365579_ZhWbLj3-Ti.jpg',
    // 'http://photos.smugmug.com/photos/206366670_j6wtvMP-Ti.jpg',
    // 'http://photos.smugmug.com/photos/359954654_CvQqHhr-Ti.jpg',
    // 'http://photos.smugmug.com/photos/359963622_52WQfk8-Ti.jpg',
    // 'http://photos.smugmug.com/photos/401591253_b93Zh9C-Ti.jpg',
    // 'http://photos.smugmug.com/photos/580383339_M4QtTH5-Ti.jpg',
    // 'http://photos.smugmug.com/photos/580384088_C243b8R-Ti.jpg',
    // 'http://photos.smugmug.com/photos/580385259_HbwGFcp-Ti.jpg',
    // 'http://photos.smugmug.com/photos/580401088_LvMPPxk-Ti.jpg',
    // 'http://photos.smugmug.com/photos/580401466_SfdpMjF-Ti.jpg',
    // 'http://photos.smugmug.com/photos/580402585_x5pvLM3-Ti.jpg',
    // 'http://photos.smugmug.com/photos/635267552_LFTn3B6-Ti.jpg',
    // 'http://photos.smugmug.com/photos/635269289_zdqNqhd-Ti.jpg',
    // 'http://photos.smugmug.com/photos/635271330_vQjB3pF-Ti.jpg',
    // 'http://photos.smugmug.com/photos/635273541_g2wCV4c-Ti.jpg',
    // 'http://photos.smugmug.com/photos/635274351_K6KBbxs-Ti.jpg',
    // 'http://photos.smugmug.com/photos/635275945_HRFnHxJ-Ti.jpg',
    // 'http://photos.smugmug.com/photos/1122730280_RnjBMCs-Ti.jpg',
    // 'http://photos.smugmug.com/photos/1122730781_LpLCGbM-Ti.jpg',
    // 'http://photos.smugmug.com/photos/1122731656_5wGnwGN-Ti.jpg',
    // 'http://photos.smugmug.com/photos/1220410421_pqTjZv3-Ti.jpg',
    // 'http://photos.smugmug.com/photos/1257250752_zh4FvMj-Ti.jpg',
    // 'http://photos.smugmug.com/photos/1517506079_HSjcJzM-Ti.jpg',
    // 'http://photos.smugmug.com/photos/1607631583_KRW6WMW-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2152505300_hx9B2TQ-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2152512697_mSDvmV7-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2152513997_9cZfztc-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2153193674_kzgWGcJ-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2455422533_dbTmrzS-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2455422878_WTPfgMw-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2455425041_CKFjm8N-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2544852374_kv5nxnp-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2544853359_ZsFBmNK-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2544854528_zrXK9sS-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2544855260_BRJKvNg-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2544856153_mZ2rwxR-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2544857001_pj2MGqL-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2544858734_sPcJJND-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2544858941_PMjmBvH-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2544859152_nVMLb9S-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2544860063_pKZxkZ2-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2544861565_PBrfD2c-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2878146251_4tVfNGq-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2878150749_Q99nmx3-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2878152209_zKPPqWk-Ti.jpg',
    // 'http://photos.smugmug.com/photos/2878215594_CFhkvHR-Ti.jpg',
    // 'http://photos.smugmug.com/photos/3176057980_g2dQv7g-Ti.jpg',
    // 'http://photos.smugmug.com/photos/3176069743_mSDP7sQ-Ti.jpg',
    // 'http://photos.smugmug.com/photos/3176071749_t8L3W7R-Ti.jpg',
    // 'http://photos.smugmug.com/photos/3176072400_k563phx-Ti.jpg',
    // 'http://photos.smugmug.com/photos/3176077274_xb7h8rh-Ti.jpg',
    // 'http://photos.smugmug.com/photos/3425117815_92VK98c-Ti.jpg'
];
var cardSets = {
    "words3": {
        "wordcount": 3,
        "totalcards": 3,
        "cards": {
            "card1": [0, 1],
            "card2": [0, 2],
            "card3": [1, 2]
        }
    },
    "words7": {
        "wordcount": 7,
        "totalcards": 7,
        "cards": {
            "card1": [0, 1, 4],
            "card2": [2, 3, 4],
            "card3": [0, 2, 5],
            "card4": [1, 3, 5],
            "card5": [0, 3, 6],
            "card6": [1, 2, 6],
            "card7": [4, 5, 6]
        }
    },
    "words13": {
        "wordcount": 13,
        "totalcards": 13,
        "cards": {
            "card1": [0, 1, 2, 9],
            "card2": [9, 3, 4, 5],
            "card3": [8, 9, 6, 7],
            "card4": [0, 10, 3, 6],
            "card5": [1, 10, 4, 7],
            "card6": [8, 2, 10, 5],
            "card7": [0, 8, 11, 4],
            "card8": [1, 11, 5, 6],
            "card9": [11, 2, 3, 7],
            "card10": [0, 12, 5, 7],
            "card11": [8, 1, 3, 12],
            "card12": [12, 2, 4, 6],
            "card13": [9, 10, 11, 12]
        }
    },
    "words31": {
        "wordcount": 31,
        "totalcards": 31,
        "cards": {
            "card1": [0, 1, 2, 3, 4, 25],
            "card2": [5, 6, 7, 8, 9, 25],
            "card3": [10, 11, 12, 13, 14, 25],
            "card4": [15, 16, 17, 18, 19, 25],
            "card5": [20, 21, 22, 23, 24, 25],
            "card6": [0, 5, 10, 15, 20, 26],
            "card7": [1, 6, 11, 16, 21, 26],
            "card8": [2, 7, 12, 17, 22, 26],
            "card9": [3, 8, 13, 18, 23, 26],
            "card10": [4, 9, 14, 19, 24, 26],
            "card11": [0, 6, 12, 18, 24, 27],
            "card12": [1, 7, 13, 19, 20, 27],
            "card13": [2, 8, 14, 15, 21, 27],
            "card14": [3, 9, 10, 16, 22, 27],
            "card15": [4, 5, 11, 17, 23, 27],
            "card16": [0, 7, 14, 16, 23, 28],
            "card17": [1, 8, 10, 17, 24, 28],
            "card18": [2, 9, 11, 18, 20, 28],
            "card19": [3, 5, 12, 19, 21, 28],
            "card20": [4, 6, 13, 15, 22, 28],
            "card21": [0, 8, 11, 19, 22, 29],
            "card22": [1, 9, 12, 15, 23, 29],
            "card23": [2, 5, 13, 16, 24, 29],
            "card24": [3, 6, 14, 17, 20, 29],
            "card25": [4, 7, 10, 18, 21, 29],
            "card26": [0, 9, 13, 17, 21, 30],
            "card27": [1, 5, 14, 18, 22, 30],
            "card28": [2, 6, 10, 19, 23, 30],
            "card29": [3, 7, 11, 15, 24, 30],
            "card30": [4, 8, 12, 16, 20, 30],
            "card31": [25, 26, 27, 28, 29, 30]
        }
    },
    "words57": {
        "wordcount": 57,
        "totalcards": 57,
        "cards": {
            "card1": [0, 1, 2, 3, 4, 5, 6, 49],
            "card2": [7, 8, 9, 10, 11, 12, 13, 49],
            "card3": [49, 14, 15, 16, 17, 18, 19, 20],
            "card4": [49, 21, 22, 23, 24, 25, 26, 27],
            "card5": [32, 33, 34, 49, 28, 29, 30, 31],
            "card6": [35, 36, 37, 38, 39, 40, 41, 49],
            "card7": [42, 43, 44, 45, 46, 47, 48, 49],
            "card8": [0, 35, 7, 42, 14, 50, 21, 28],
            "card9": [1, 36, 8, 43, 15, 50, 22, 29],
            "card10": [2, 37, 9, 44, 16, 50, 23, 30],
            "card11": [3, 38, 10, 45, 17, 50, 24, 31],
            "card12": [32, 4, 39, 11, 50, 46, 18, 25],
            "card13": [33, 5, 40, 12, 47, 50, 19, 26],
            "card14": [34, 6, 41, 13, 48, 50, 20, 27],
            "card15": [0, 32, 48, 8, 16, 40, 51, 24],
            "card16": [1, 33, 41, 42, 17, 51, 9, 25],
            "card17": [34, 35, 10, 43, 2, 18, 51, 26],
            "card18": [51, 3, 36, 11, 44, 19, 27, 28],
            "card19": [4, 37, 12, 45, 51, 20, 21, 29],
            "card20": [5, 38, 13, 14, 51, 46, 22, 30],
            "card21": [6, 39, 7, 15, 51, 23, 47, 31],
            "card22": [0, 38, 9, 47, 18, 52, 27, 29],
            "card23": [1, 39, 10, 48, 19, 52, 21, 30],
            "card24": [2, 40, 42, 11, 20, 22, 52, 31],
            "card25": [32, 3, 41, 43, 12, 14, 52, 23],
            "card26": [33, 35, 4, 44, 13, 15, 52, 24],
            "card27": [34, 36, 5, 7, 45, 16, 52, 25],
            "card28": [37, 6, 8, 46, 17, 52, 26, 28],
            "card29": [0, 33, 36, 10, 46, 20, 53, 23],
            "card30": [1, 34, 37, 11, 14, 47, 53, 24],
            "card31": [2, 38, 12, 15, 48, 53, 25, 28],
            "card32": [3, 39, 42, 13, 16, 53, 26, 29],
            "card33": [4, 7, 40, 43, 17, 53, 27, 30],
            "card34": [5, 8, 41, 44, 18, 21, 53, 31],
            "card35": [32, 35, 6, 9, 45, 19, 53, 22],
            "card36": [0, 41, 11, 45, 15, 54, 26, 30],
            "card37": [1, 35, 12, 46, 16, 54, 27, 31],
            "card38": [32, 2, 36, 13, 47, 17, 21, 54],
            "card39": [33, 3, 37, 7, 48, 18, 22, 54],
            "card40": [34, 4, 38, 8, 42, 19, 54, 23],
            "card41": [5, 39, 9, 43, 20, 54, 24, 28],
            "card42": [6, 40, 10, 44, 14, 54, 25, 29],
            "card43": [0, 34, 39, 44, 12, 17, 22, 55],
            "card44": [1, 40, 55, 13, 45, 18, 23, 28],
            "card45": [2, 7, 41, 46, 19, 55, 24, 29],
            "card46": [3, 8, 47, 35, 20, 55, 25, 30],
            "card47": [4, 9, 14, 48, 55, 36, 26, 31],
            "card48": [32, 37, 10, 15, 55, 27, 42, 5],
            "card49": [33, 43, 38, 6, 11, 16, 21, 55],
            "card50": [0, 37, 43, 13, 19, 56, 25, 31],
            "card51": [32, 1, 38, 7, 44, 20, 56, 26],
            "card52": [33, 2, 39, 8, 45, 14, 56, 27],
            "card53": [34, 3, 40, 9, 46, 15, 21, 56],
            "card54": [4, 41, 10, 47, 16, 22, 56, 28],
            "card55": [35, 5, 11, 48, 17, 23, 56, 29],
            "card56": [36, 6, 42, 12, 56, 18, 24, 30],
            "card57": [49, 50, 51, 52, 53, 54, 55, 56]
        }
    }
};

var wordCount = words.length;
function spotIt(words,cardSets){
    var randomNums;
    var cards = [];
    console.log("word count", wordCount);
    var cardSet = cardSets["words"+wordCount];
    // cardSet.cards = shuffle(cardSet.cards);
    if(cardSet){
        console.log("Have a matching count");
        console.log(cardSet);
        if(randomizeCards){
            // because cards are an object and not an array, we can't really randomize it.  But we can make a new array with the right number of numbers and then randomize that.
            randomNums = [];
            for(var x = 1; x < (wordCount+1); x++){
                randomNums.push(x);
            }
            // console.log("Randomnums before randomization", randomNums);
            randomNums = shuffle(randomNums);
            // console.log("Randomnums before randomization", randomNums);
        }
        for(var y = 1; y < (wordCount+1); y++){
            var cardNum = typeof randomNums === "object"?randomNums[y-1]:y;
            var cardCode = '<div class="card" data-card='+cardNum+'>';
            cardCode += '<span class="card__num">Card '+cardNum+'</span>';
            var curCard = cardSet.cards["card"+cardNum];
            console.log("Card "+y, curCard);
            // randomize the items in the card, could make optional
            
            if(randomizeItems){
                curCard = shuffle(curCard);
            }
            curCard.forEach(function(wordNum){
                // console.log(wordNum,words[wordNum]);
                var content = words[wordNum];
                // console.log(content.indexOf('http'));
                if(content.indexOf('http') === 0){// is a URL, so is an image
                    // console.debug("image");
                    // console.debug("wordNum",wordNum);
                    content = '<img src="'+words[wordNum]+'"/>';
                }
                cardCode += '<span class="card__item" data-item='+wordNum+'>'+content+'</span>';
            });
            // console.log("end card");
            cardCode += '</div>';
            cards.push(cardCode);
        }
    } else {
        console.log("no matching count, try again");
    }
    return cards;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var result = spotIt(words,cardSets);
var output = document.querySelector('#output');
output.innerHTML = result.join(' ');

function game(){
    var card1, card2;
    // show only two cards
    
    // show two random cards
    var cardNums = showTwo();

    
    // add onlcick to items
    var body = document.querySelector("body");
    body.addEventListener("click",function(event){
        console.debug(event);
        var curElem = event.target;
        
    });
    // when clicked see if the match for the clicked one is in the other card
}
function showTwo(){
    // hiden em all first
    var cards = document.querySelectorAll(".card");
    [].forEach.call(cards,function(card){
        // console.log(card);
        card.classList.add("hide");
    });
    card1 = Math.floor(Math.random() * wordCount)+1;
    card2 = Math.floor(Math.random() * wordCount)+1;
    // make sure they aren't the same number
    while(card1 === card2){
        card2 = Math.floor(Math.random() * wordCount)+1;
    }
    console.debug(card1,card2);
    document.querySelector('[data-card="'+card1+'"]').classList.remove("hide");
    document.querySelector('[data-card="'+card2+'"]').classList.remove("hide");
    
    return [card1,card2];
}
if (runGame){
    game();
}