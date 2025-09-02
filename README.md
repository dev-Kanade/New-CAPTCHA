# ComputerCheck
人間かどうか確かめるやつです（制作段階）

# 当モジュールの使い方
またリポジトリのWikiでも書く予定ですが、インポート方法や使い方を書きます。

### インポート

まず当リポジトリを丸々ダウンロードするか、[capture.js](./captcha.js)のみをダウンロードして任意の場所に設置します。
以下の手順でインポートが可能です。(JavaScript)

```
const { captcha }=require("./captcha.js);
```
または
```
import { captcha } from './captcha.js'
```
ちなみにインポートする変数名は`captcha`と書いていますが、何でもいいです。また、require又はfromのあとはモジュールファイルのパスを書いてください。

### 検査の結果の取得方法
結果は以下の手順で取得が可能です。

```
let human = captcha.human
```
これに対する出力例は</br>
・`null` : 未検査</br>
・`true` : 人間であることが確認できた</br>
・`false`: 人間であることが確認できなかった</br>


また、上記のように変数宣言で取得する場合は必ず`let`を用いてください。

### 検査を実行するために

まずコードの例を書きます
```
const captcha = new captcha();
const captchaBlock = captcha.block();
document.getElementById('captcha-container').appendChild(captchaBlock);
```
このコードは`captcha-container`というidを持った要素に挿入されます。ここは自由に変更することができます。
