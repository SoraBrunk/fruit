import { _decorator, Component, Node, Collider2D, Contact2DType, IPhysics2DContact, Label, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('scroe')
export class scroe extends Component {
    @property({type:Node}) Score:Node;
    num:string = "";
    start() {
        this.destroyFruit();
        this.num = this.Score.getComponent(Label).string;
    }

    update(deltaTime: number) {
        
    }

    //碰撞底部销毁
    destroyFruit() {
        let box = this.getComponent(Collider2D);
        box.on(Contact2DType.END_CONTACT, this.onEndContact, this)
    }

    //碰撞回调
    onEndContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        let fruit:Node = otherCollider.node;
        // // fruit.parent.removeChild(fruit);
        if(fruit) {
            setTimeout(()=>{
                fruit.destroy();
            }, 5);
        }
        director.loadScene("gameover");
    }
}


