const wave = {
    name: 'wave',
    size: {width: 200, height: 200},
    frames: [
        require('./wave1.png'),
        require('./wave2.png'),
        require('./wave3.png'),
        require('./wave4.png'),
        require('./wave5.png'),
        require('./wave6.png'),
        require('./wave7.png'),
        require('./wave8.png'),
        require('./wave9.png'),
        require('./wave10.png'),
    ],
    animationIndex: function getAnimationIndex(animationType) {
        switch (animationType) {
            case 'wave':
                return [0,1,2,3,4,5,6,7,8,9,0];
        }
    }
}

export default wave;