import { _decorator, Component, Director, Node, Scene, director, game } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class NewComponent extends Component {
    startScene:Scene;
    start() {
        // this.startScene = director.getScene();
    }

    update(deltaTime: number) {
        
    }

    //游戏开始
    gameStart(){
        // console.log(this.startScene);
        director.loadScene("gameStart");
    }
}


