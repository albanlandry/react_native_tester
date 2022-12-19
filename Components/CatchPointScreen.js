
import React, {useEffect, useRef, useState} from 'react';
import { Animated, Button, Image, ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native';
import { SoftLightBlend, Emboss, Earlybird, Invert, RadialGradient } from 'react-native-image-filter-kit';
import { Grayscale, Sepia, Tint, ColorMatrix, concatColorMatrices, invert, contrast, saturate } from 'react-native-color-matrix-image-filters';
import AnimatedSprite from 'react-native-animated-sprite';
import wave from '../static/image/wave/waveSprite';
/**
 * 
 * @param {*} props 
 * @returns 
 */
const AnimatedWave = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const sizeAnim = useRef(new Animated.Value(0)).current;
    const size = props.size || 100;
    const duration = props.duration || 500;
    const waveWidth = props.waveWidth || 10;
    const spriteRef = useRef(null);
    const stop = props.stop || false;
    
    /**
     * 
     */
    useEffect(() => {
        Animated.parallel([
            Animated.sequence([
                Animated.timing(fadeAnim,
                    {
                      toValue: 0.5,
                      duration: duration / 2,
                    }
                ),
                Animated.timing(fadeAnim,
                    {
                      toValue: 0,
                      duration: duration / 2,
                    }
                ),
            ]),
            Animated.spring(sizeAnim,
                {
                  toValue: size,
                  duration: duration,
                }
            ),
        ]).start();
    }, [fadeAnim, sizeAnim])

    /*
    return <Animated.View style={[catchImageStyle.wave, {
        borderWidth: waveWidth,
        opacity: fadeAnim,
        width: sizeAnim,
        height: sizeAnim,
    }]}></Animated.View>
    */
   return <View style={[{width: size, height: size}]}>
        <AnimatedSprite
            ref={spriteRef}
            sprite={wave}
            animationFrameIndex={wave.animationIndex('wave')}
            loopAnimation = {!stop}
            coordinates={{
                top: -size / 2 -10,
                left: -size / 2 -10
            }}
            size={{
                width: size * 2,
                height: size * 2,
            }}
        />
   </View>;
}

/**
 * 
 * @param {*} props 
 * @returns 
 */
function CatchImage(props) { 
    const [found, setFound] = useState(props.found || false);
    const already = useRef(props.already || false);
    const width = props.width || 100;
    const height = props.height || 100;
    const scaleXAnim = useRef(new Animated.Value(width)).current;
    const scaleYAnim = useRef(new Animated.Value(height)).current;
    const scaleXAnimColor = useRef(new Animated.Value(0)).current;
    const scaleYAnimColor = useRef(new Animated.Value(0)).current;
    const [stop, setStop] = useState(false)
    // const 
    

    useEffect(() => {
        const animate = () => {
            return Animated.sequence([
                Animated.parallel([
                    Animated.spring(scaleXAnim, {
                        toValue: 0,
                        duration: 200,
                    }),
                    Animated.spring(scaleYAnim, {
                        toValue: 0,
                        duration: 200,
                    }),
                ]),
                Animated.parallel([
                    Animated.spring(scaleXAnimColor, {
                        toValue: width,
                        duration: 400
                    }),
                    Animated.spring(scaleYAnimColor, {
                        toValue: height,
                        duration: 400
                    }),
                ]),
            ]);
        };

        if(found && !already.current) {
            animate().start(({finished}) => {
                setStop(finished)
            });
            already.current = true;
        }
    })

    return <Animated.View style={[catchImageStyle.container, {width: width, height: height}]}>
        <Animated.Image style={[catchImageStyle.mainImage, {width: scaleXAnim, height: scaleYAnim}]} source={{ uri: "https://metaversero.s3.ap-northeast-2.amazonaws.com/catchPoint/M_B_Piece0.png" }} />
        {found && <Animated.Image style={[catchImageStyle.mainImage, {width: scaleXAnimColor, height: scaleYAnimColor}]} source={{ uri: "https://metaversero.s3.ap-northeast-2.amazonaws.com/catchPoint/M_Piece0.png" }} />}
        {(found && !already.current) && <AnimatedWave size={width} stop={stop} />}
    </Animated.View>
}

/**
 * 
 * @param {*} props 
 * @returns 
 */
function CatchPointScreen(props) {
    return <SafeAreaView style={catchPointStyle.screen}>
        <View style={catchPointStyle.container}>
            <CatchImage found={true}/>
        </View>
    </SafeAreaView>
}

const catchPointStyle = StyleSheet.create({
    screen: {
        backgroundColor: '#999999',
        flex: 1
    },
    container: {
        justifyContent: 'center',
        padding: 10
    }
});

const catchImageStyle = StyleSheet.create({
    container: {
        justifyContent: 'center', 
        alignItems: 'center',
    },
    mainImage: {
        position: 'absolute',
    },
    gif: {
        width: 100,
        height: 100,
        opacity: 1,
        position: 'absolute',
    },
    wave: {

        borderColor: '#FFFFFF',
        borderRadius: 1000
    }
});

export default CatchPointScreen;