import { _decorator, Component, instantiate, Node, Prefab, random, Scene, tween, director, Vec2, Vec3, Collider2D, Contact2DType, Input, input, MotionStreak, IPhysics2DContact, v3, Quat, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('gameStr')
export class gameStr extends Component {
    @property({type: [Prefab]}) myFruits: Prefab[] = [];
    @property({type: Node}) bottom: Node;
    @property({type: Node}) mouseMovAni: Node;
    @property({type: Node}) test: Node;
    @property({type: Node}) label: Node;
    scene: Scene;
    score: number = 0;
    // vec: Vec3 = v3(250, 1100, 0);
    touch: boolean = false;
    start() {
        // this.fruitRote();
        // this.scene = director.getScene();
        // this.vec = new Vec3(250, 1100, 0);
        // this.createfruit();
        // this.fruitRote();
        this.label.getComponent(Label).string = `得分：${this.score}`;
        this.mouseMovAni.active = false;
        this.schedule(function() {
            this.createfruit();
        }, 2);
        this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);  
    }

    update(deltaTime: number) {
        let loc = this.mouseMovAni.getPosition();
        // this.mouseMovAni.setPosition(loc.x + 1,loc.y + 1, 0 );
    }

    //生成水果
    createfruit() {
        let strNumber = Math.floor(Math.random() * 4);
        let sx = Math.floor(Math.random() * 500) + 90;
        // this.vec.x = sx;
        let fruit = instantiate(this.myFruits[strNumber]);
        this.node.addChild(fruit);
        // if(pos) {
        //     // console.log(fruit.getPosition())
            fruit.setPosition(sx, 1100, 0);
            tween()
            .target(fruit)
            .by(1.0, { angle: 90})
            .repeatForever()
            .start()
        fruit.on(Node.EventType.TOUCH_START, this.clickFruits, this);
    }

    //水果旋转
    fruitRote() {
    // this.myFruits.forEach(i => {
    //     tween().target(i).to(1, {Rotation: 360}).start();
    // });
    }

    //触摸事件
    onTouchStart(e) {
        e.propagationStopped = true
        if(e) {
            this.touch = true;
            // console.log(e);
        }

        // ani.setPosition(e.getUILocation());
    }

    //触摸移动
    onTouchMove(e) {
        e.propagationStopped = true;
        this.mouseMovAni.active = true;
        if(this.touch) {
            this.mouseMovAni.setPosition(e.getUILocation(), 0, 0);
            let mostionstreak = this.mouseMovAni.getComponent(MotionStreak);
            let mx = e.getUILocation().x;
            let my = e.getUILocation().y;
            mostionstreak.node.setPosition(mx, my, 0);
            let box = this.mouseMovAni.getComponent(Collider2D);
            box.on(Contact2DType.BEGIN_CONTACT, this.onEndContact, this)
        }
    }

    //触摸释放
    onTouchEnd(e) {
        if(this.touch) {
            this.touch = false;
            this.mouseMovAni.active = false;
        }
    }

    //预制体点击
    clickFruits(e) {
        e.propagationStopped = true;
    }

    //鼠标与水果碰撞
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        let fruit:Node = otherCollider.node;
        setTimeout(()=>{
            fruit.destroy();
        }, 100);
        // switch (fruit.name) {
        //     case "01": this.score += 1;
        //     case "02": this.score += 2;
        //     case "03": this.score += 3;
        //     case "04": this.score += 4;
        // }
        if(fruit.name == "01") {
            this.score += 1;
        }else if(fruit.name == "02") {
            this.score += 2;
        }else if(fruit.name == "03") {
            this.score += 3;
        }else if(fruit.name == "04") {
            this.score += 4;
        }
        this.label.getComponent(Label).string = `得分：${this.score}`;
    }
}


