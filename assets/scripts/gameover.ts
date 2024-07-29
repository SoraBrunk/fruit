import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('gameover')
export class gameover extends Component {
    //游戏结束
    gameOver(){
        // console.log(this.startScene);
        director.loadScene("scene");
    }
}


