
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera'; 
import * as MediaLibrary from 'expo-media-library'; 
import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [permisosCamara, setPermisoCamara] = useState(null);  
  const [imagen, setImagen] = useState(null); 
  const [tipo, settipo] = useState(Camera.Constants.Type.back); 
  const cameraRef = useRef(null); 


  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync(); 
      const estadoCamara = await Camera.requestCameraPermissionsAsync(); 
      setPermisoCamara(estadoCamara.status === 'granted'); 
    })(); 
  }, []) 

  const tomarFoto = async () => {
    if(cameraRef) {
      try{
        const datos = await cameraRef.current.takePictureAsync(); 
        setImagen(datos.uri);
      } catch(e) {
        console.log("Error al tomar foto");
      }
    }
  }

 
  const guardarFoto = async () => {
    if(imagen) {
      try {
        await MediaLibrary.createAssetAsync(imagen);
        alert('Foto guardada')
        setImagen(null); 
      } catch (e) {
        console.log("Error al guardar la imagen")
      }
    }
  }


  if(permisosCamara === false) {
    return <Text>No se puede acceder a la camara por falta de permiso</Text>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>APP Sensor Camara</Text>
      <View style={styles.contenido}>
      {!imagen ?
      <Camera
        style={styles.camera}
        type={tipo} 
        flashMode={Camera.Constants.FlashMode.off}
        ref={cameraRef}
      >
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 30,
        }}>
          
         
        </View>
      </Camera>
      : 
      <Image source={{uri: imagen}} style={styles.camera} />
      }
      <View>
        {imagen ? 
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 50
        }}> 
          <TouchableOpacity onPress={() => setImage(null)} style={styles.button}>
            <Entypo name={"retweet"} size={28} color={'#f1f1f1'}/>
            <Text style={styles.text}>{"Restaurar"}</Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={guardarFoto} style={styles.button}>
            <Entypo name={"check"} size={28} color={'#f1f1f1'}/>
            <Text style={styles.text}>{"Tomar foto"}</Text>
        </TouchableOpacity>
        </View>
        : 
        <TouchableOpacity onPress={tomarFoto} style={styles.button}>
            <Entypo name={"camera"} size={28} color={'#f1f1f1'}/>
            <Text style={styles.text}>{"Tomar foto"}</Text>
        </TouchableOpacity>
        }
      </View>
      </View>
    </View>
  );




}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contenido:{
    height: 500,
    width:300
  },
  camera: {
    flex:1,  /*con esto abarca toda la pantalla*/
    borderRadius: 20,
    height: 100,
    width:300

  },
  button: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
},
text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#f1f1f1',
    marginLeft: 10
},
texto:{
  fontWeight: 'bold',
    fontSize: 25,
    color: 'clay',
    
}
});
