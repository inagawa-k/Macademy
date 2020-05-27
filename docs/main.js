// ref: https://jp.vuejs.org/v2/cookbook/client-side-storage.html
// ref: https://qiita.com/Hiroyuki1993/items/56e4b0c15786bf8d787b

const app = new Vue({
  el: '#app',
  data: {
    base: {
      name : '',
      player : '',
      race : '',
      cover : ''
    },

    classes: [
      {
        id : 1,
        classname : '',
        level : ''
      },
      {
        id : 2,
        classname : '',
        level : ''
      },
      {
        id : 3,
        classname : '',
        level : ''
      }
    ],

    abilities : [
      {
        name : '体力',
        value : '',
        bonus : 0
      },
      {
        name : '反射',
        value : '',
        bonus : 0
      },
      {
        name : '知覚',
        value : '',
        bonus : 0
      },
      {
        name : '理知',
        value : '',
        bonus : 0
      },
      {
        name : '意志',
        value : '',
        bonus : 0
      },
      {
        name : '幸運',
        value : '',
        bonus : 0
      }      
    ],

    combats : [
      {
        name : '命中値',
        base_value : 0,
        correction : '',
        current_value : 0
      },
      {
        name : '回避値',
        base_value : 0,
        correction : '',
        current_value : 0
      },
      {
        name : '魔導値',
        base_value : 0,
        correction : '',
        current_value : 0
      },
      {
        name : '抗魔値',
        base_value : 0,
        correction : '',
        current_value : 0
      },
      {
        name : '行動値',
        base_value : 0,
        correction : '',
        current_value : 0
      },
      {
        name : '耐久力',
        base_value : 0,
        correction : '',
        current_value : 0
      },
      {
        name : '精神力',
        base_value : 0,
        correction : '',
        current_value : 0
      }
    ],

    moves : [
      {
        name : '戦闘移動',
        value : 0
      },
      {
        name : '全力移動',
        value : 0
      }
    ],

    trends : [
      {
        id : 1,
        left_name : '勇敢',
        right_name : '慎重',
        left_value : 2,
        right_value : 6
      },
      {
        id : 2,
        left_name : '情け深い',
        right_name : '冷静',
        left_value : 2,
        right_value : 6
      },
      {
        id : 3,
        left_name : '正直',
        right_name : 'したたか',
        left_value : 2,
        right_value : 6
      },
      {
        id : 4,
        left_name : '信じやすい',
        right_name : '疑り深い',
        left_value : 2,
        right_value : 6
      },
      {
        id : 5,
        left_name : '寛容',
        right_name : 'まじめ',
        left_value : 2,
        right_value : 6
      },
      {
        id : 6,
        left_name : '情熱的',
        right_name : '純情',
        left_value : 2,
        right_value : 6
      }
    ],

    // ここから下は selector 用
    classdata : [
      {
        name : '神魔/アース',
      },
      {
        name : '神魔/ウィンド',
      }
    ],

    // ここから下はドロップファイル用
    dropfile : ''
  },


  methods: {

    ////////////////////////////////////////////////////////////////////////
    // キャラクターシート入力部
    ////////////////////////////////////////////////////////////////////////

    /*
    clearAbilities() {
      this.abilities.forEach(el => {
        el.value = 0;
        el.bonus = 0;
      });
    },

    incrementAbility(name, data) {
      this.abilities.forEach(el => {
        ability = this.abilities.find(el => el.name == name);
        ability.value += value;
        ability.bonus += Math.floor(ability.value / 4);  
      });
    },

    calc() {

      // 能力値をリセット
      clearAbilities();

      // 1-3番目のクラスを順番に見ていく
      for (i == 0; i < 3; i++) {

        // キャラのクラスを取得
        let char_class = this.classes.find(el => el.no == i);

        // そのクラスの名前とレベルを取得
        let name = char_class.classname;
        let level = char_class.level;

        // レベルの数だけループする
        for (j == 0; j < level; j++) {
          // クラス名からクラスデータ取得
          let data = this.classdata.find(el => el.name == Name);
        
          // 能力値を計算
          incrementAbility(data);
        }

      }
    },
    */

    // 移動値を修正する
    changeMoves() {
      var action = this.combats.find(el => el.name == '行動値');

      var combatmove = this.moves.find(el => el.name == '戦闘移動');
      combatmove.value = Number(action.current_value) + 5;

      var fullmove = this.moves.find(el => el.name == '全力移動');
      fullmove.value = (Number(action.current_value) + 5) * 2;  
    },

    // 戦闘値を修正する
    changeCombats() {
      this.combats.forEach(el => {
        el.current_value = Number(el.base_value) + Number(el.correction);
      });    

      // 移動値を修正する
      this.changeMoves();        
    },

    // 戦闘基本値を修正する
    changeCombatsBase() {

      // 能力値を取得
      var strong = this.abilities.find(el => el.name == '体力');
      var reflexies = this.abilities.find(el => el.name == '反射');
      var sense = this.abilities.find(el => el.name == '知覚');
      var intellect = this.abilities.find(el => el.name == '理知');
      var will = this.abilities.find(el => el.name == '意志');
      var blessing = this.abilities.find(el => el.name == '幸運');

      // 戦闘基本値を計算する
      var hit = this.combats.find(el => el.name == '命中値');
      hit.base_value = Math.floor((reflexies.bonus + sense.bonus) / 2);
      var dodge = this.combats.find(el => el.name == '回避値');
      dodge.base_value = Math.floor((reflexies.bonus + blessing.bonus) / 2);
      var magic = this.combats.find(el => el.name == '魔導値');
      magic.base_value = Math.floor((intellect.bonus + sense.bonus) / 2);
      var countermagic = this.combats.find(el => el.name == '抗魔値');
      countermagic.base_value = Math.floor((intellect.bonus + blessing.bonus) / 2);
      var action = this.combats.find(el => el.name == '行動値');
      action.base_value = reflexies.bonus + intellect.bonus;
      var hp = this.combats.find(el => el.name == '耐久力');
      hp.base_value = strong.value;
      var mp = this.combats.find(el => el.name == '精神力');
      mp.base_value = will.value;

      // 戦闘値を修正する
      this.changeCombats();  

    },

    // 能力値が入力された
    onChangeAbility(name) {

      // 能力ボーナスを計算する
      //this.abilities.forEach(el => {
      //  el.bonus = Math.floor(el.value / 3); 
      //});
      var ability = this.abilities.find(el => el.name == name);
      ability.bonus = Math.floor(ability.value / 3); 

      // 戦闘基本値を修正する
      this.changeCombatsBase();
    },

    // 性格が入力された
    onChangeTrend(left_name, isLeftChanged) {

      const MAX = 8;

      var trend = this.trends.find(el => el.left_name == left_name);

      if (isLeftChanged) {
        if (trend.left_value > 0 && trend.left_value < MAX) {
          trend.right_value = MAX - trend.left_value;
        } 
        else {
          trend.left_value = MAX - trend.right_value;
        }
      } 
      else {
        if (trend.right_value > 0 && trend.right_value < MAX) {
          trend.left_value = MAX - trend.right_value;
        } 
        else {
          trend.right_value = MAX - trend.left_value;
        }
      }
    },

    ////////////////////////////////////////////////////////////////////////
    // zip ダウンロード部
    ////////////////////////////////////////////////////////////////////////

    /* xml の elem 作成 */
    createElem(name, text) {
      var elem = document.createElement('data');
      elem.setAttribute('name', name);
      elem.innerText = text;
      return elem;
    },

    /* numberResource である xml elem 作成 */
    createNumRcElem(name, maxValue, currentValue) {
        var elem = document.createElement('data');
        elem.setAttribute('name', name);
        elem.innerText = maxValue;
        elem.setAttribute('type', 'numberResource');
        elem.setAttribute('currentValue', currentValue);
        return elem;
    },

    createImgBlock() {
      var img = document.createElement('data');
      img.setAttribute('name', 'image');
      var elem = document.createElement('data');
      elem.setAttribute('type', 'image');
      elem.setAttribute('name', 'imageIdentifier');
      elem.innerText = 'null';
      img.appendChild(elem);

      return img;
    },

    createCommonBlock() {
      var common = document.createElement('data');
      common.setAttribute('name', 'common');      

      var elm = this.createElem('name', this.base.name);
      common.appendChild(elm);
      common.appendChild(this.createElem('プレイヤー名', this.base.player));
      common.appendChild(this.createElem('種族', this.base.race));
      common.appendChild(this.createElem('カバー', this.base.cover));

      // 1-3番目のクラスを順番に見ていく
      i = 0;
      this.classes.forEach(el => {
        // そのクラスの名前とレベルを取得
        let name = el.classname;
        if (name != '') {
          let level = el.level;
          if (level == '')
            level = 1;

          common.appendChild(this.createElem('クラス' + i, name));
          common.appendChild(this.createElem('レベル' + i, level));
          i++;
        }
      });
      
      common.appendChild(this.createNumRcElem('衝動点', 10, 0));

      return common;
    },

    createResourcesBlock() {
      var hp = this.combats.find(el => el.name == '耐久力').current_value;
      var mp = this.combats.find(el => el.name == '精神力').current_value;

      var resource = document.createElement('data');
      resource.setAttribute('name', 'リソース');
      resource.appendChild(this.createNumRcElem('HP', hp, hp));
      resource.appendChild(this.createNumRcElem('MP', mp, mp));

      return resource;
    },

    createMovesBlock() {
      var move = document.createElement('data');
      move.setAttribute('name', '行動・移動');

      this.moves.forEach(el => {
        move.appendChild(this.createElem(el.name, el.value));
      });

      return move;
    },

    createAbilitiesBonusBlock() {    
      var ability_b = document.createElement('data');
      ability_b.setAttribute('name', '能力ボーナス');

      this.abilities.forEach(el => {
        ability_b.appendChild(this.createElem(el.name, el.bonus));
      });

      return ability_b;
    },

    createCombatsBlock() {
      var combats = document.createElement('data');
      combats.setAttribute('name', '戦闘値');

      this.combats.forEach(el => {
        combats.appendChild(this.createElem(el.name, el.current_value));
      });

      return combats;
    },

    createTrendsBlock() {
      var trends = document.createElement('data');
      trends.setAttribute('name', '性格');    
    
      this.trends.forEach(el => {
        trends.appendChild(this.createElem(el.left_name, el.left_value));
        trends.appendChild(this.createElem(el.right_name, el.right_value));
      });  
    
      return trends;
    },

    createChatPaletteBlock() {
      var cpd = document.createElement('chat-palette');

      var txt = '';
      txt += '========= 基本的な判定 ======== \n';
      txt += '2d6+{体力} 【体力】\n';
      txt += '2d6+{反射} 【反射】\n';
      txt += '2d6+{知覚} 【知覚】\n';
      txt += '2d6+{理知} 【理知】\n';
      txt += '2d6+{意志} 【意志】\n';
      txt += '2d6+{幸運} 【幸運】\n';
      txt += '\n';
      txt += '========= 戦闘中の判定 ======== \n';
      txt += '2d6+{命中値} 【命中値】\n';
      txt += '2d6+{回避値} 【回避値】\n';
      txt += '2d6+{魔導値} 【魔導値】\n';
      txt += '2d6+{抗魔値} 【抗魔値】\n';
      cpd.innerText = txt;

      return cpd;
    },

    createBackupData() {
      var backup = document.createElement('data');

      var data = {};
      data['base'] = JSON.stringify(this.base);
      data['classes'] = JSON.stringify(this.classes);
      data['abilities'] = JSON.stringify(this.abilities);
      data['combats'] = JSON.stringify(this.combats);
      data['moves'] = JSON.stringify(this.moves);
      data['trends'] = JSON.stringify(this.trends);

      backup.innerText = JSON.stringify(data);
      return backup;
    },

    createXml() {
      /* xml を生成 */
      var xml = document.createElement('character');
      xml.setAttribute('location.x', '0');
      xml.setAttribute('location.y', '0');
      xml.setAttribute('posZ', '0');

      /* xml の root に char 要素を作成する */
      var char = document.createElement('data');
      char.setAttribute('name', 'character');

      /* img ブロックを作成し，char の子ノードとする */
      char.appendChild(this.createImgBlock());

      /* common (キャラクター名，プレイヤー名など) ブロックを作成し，char の子ノードとする */
      char.appendChild(this.createCommonBlock());      

      /* detail (能力値など) ブロックを作成し，char の子ノードとする */
      var detail = document.createElement('data');
      detail.setAttribute('name', 'detail');
      char.appendChild(detail);

      /* resource (HP, MP)ブロックを作成し，detail の子ノードとする */
      detail.appendChild(this.createResourcesBlock());

      /* move (行動値，移動値)ブロックを作成し，detail の子ノードとする */
      detail.appendChild(this.createMovesBlock());

      /* ability_b (能力値ボーナス)ブロックを作成し，detail の子ノードとする */
      detail.appendChild(this.createAbilitiesBonusBlock());

      /* ability (能力値ボーナス)ブロックを作成し，detail の子ノードとする */
      //detail.appendChild(this.createAbilityBlock());

      /* combats (戦闘値) ブロックを作成し，detail の子ノードとする */
      detail.appendChild(this.createCombatsBlock());

      /* trends (性格) ブロックを作成し，detail の子ノードとする */
      var trends = document.createElement('data');
      trends.setAttribute('name', 'trends');
      trends.appendChild(this.createTrendsBlock());
      detail.appendChild(trends);

      /* 雛形にキャラデータとチャットパレットを設定 */
      xml.appendChild(char);
      xml.appendChild(this.createChatPaletteBlock());

      /* バックアップデータの作成 */
      xml.appendChild(this.createBackupData());

      return xml;
    },

    // zip書き出しボタンクリック
    onClickSaveButton() {
      /* xml 生成 */
      var xml = this.createXml();

      /* xml を zip 圧縮 */
      var s = new XMLSerializer();
      var out = s.serializeToString(xml);
      out = out.replace(/xmlns=.http:\/\/www\.w3\.org\/1999\/xhtml../, '');
      out = out.replace(/<br \/>/g, '\n');
      out = out.replace(/currentvalue/, 'currentValue');
      var zip = new JSZip();
      var char_name = this.base.name;
      zip.file(char_name + '.xml', out);

      /* ファイル保存 */
      zip.generateAsync({type:'blob'})
      .then(function(blob) {
        saveAs(blob, char_name + '.zip');
      });
    },

    ////////////////////////////////////////////////////////////////////////
    // ファイルドロップ処理部
    ////////////////////////////////////////////////////////////////////////

    setData(/*doc, html_name, xml_name*/) {
      //getElemByName(html_name).value = doc.getElementsByName(xml_name)[0].innerHTML;    
    },

    // XML をパース
    parseXml(xml) {
      var parser = new DOMParser();
      const doc = parser.parseFromString(xml, "text/xml");
      //text = doc.getElementsByName("体力")[0];
      //alert(text.innerHTML);

      console.log(doc);

      //getElemByName("base.name").value = doc.getElementsByName("name")[0].innerHTML;    
      //self.base.name = doc.getElementsByName('name')[0].innerHTML;
      //self.base.player = doc.getElementsByName('player')[0].innerHTML;
      //self.base.race = doc.getElementsByName('race')[0].innerHTML;
      //self.base.cover = doc.getElementsByName('cover')[0].innerHTML;
      self.base = doc.getElementsByName('base');

      return;

      setData(doc, "class.1", "クラス1");
      setData(doc, "level.1", "クラス1のレベル");
      setData(doc, "class.2", "クラス2");
      setData(doc, "level.2", "クラス2のレベル");
      setData(doc, "class.3", "クラス3");
      setData(doc, "level.3", "クラス3のレベル");

      setData(doc, "ability_b.strong", "体力");
      setData(doc, "ability_b.reflexes", "反射");
      setData(doc, "ability_b.sense", "知覚");
      setData(doc, "ability_b.intellect", "理知");
      setData(doc, "ability_b.will", "意志");
      setData(doc, "ability_b.blessing", "幸運");

      setData(doc, "ability.strong", "体力基本値");
      setData(doc, "ability.reflexes", "反射基本値");
      setData(doc, "ability.sense", "知覚基本値");
      setData(doc, "ability.intellect", "理知基本値");
      setData(doc, "ability.will", "意志基本値");
      setData(doc, "ability.blessing", "幸運基本値");

      setData(doc, "outfits.total.hit", "命中");
      setData(doc, "outfits.total.dodge", "回避");
      setData(doc, "outfits.total.magic", "魔導");
      setData(doc, "outfits.total.countermagic", "抗魔");
      setData(doc, "outfits.total.action", "行動");
      setData(doc, "outfits.total.hp", "耐久");
      setData(doc, "outfits.total.mp", "精神");

      setData(doc, "move.combat", "戦闘移動");
      setData(doc, "move.full", "全力移動");
    },

    // ドロップされたzipファイルを展開
    onLoadZip(f) {
      // this をスコープ外で使えるようにコピーしておく
      var self = this;

      // zipファイルを展開
      var jszip = new JSZip();
      jszip.loadAsync(f)                               
      .then(function(zip) {
            // zipに圧縮されていたファイルごとに処理
            zip.forEach(function(relativePath, zipEntry) {   
              // 文字列として読み込み
              zip.file(zipEntry.name).async("string")
              .then(function(data) {
                // parse
                var parser = new DOMParser();
                self.parseXml(parser.parseFromString(data, "text/xml"));
              });   
          });
      });
    },

    // ファイルドロップ時の処理
    // ref: https://reffect.co.jp/vue/drag-drop-file-upload
    dropFile() {
      var files = event.dataTransfer.files; 

      for (var i = 0; i < files.length; i++) { 
        this.onLoadZip(files[i]);
      }
    }  
  }
})