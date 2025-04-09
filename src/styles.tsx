import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Main.tsx Styles
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F172A',
  },
  mover: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    shadowColor: '#fff',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  mainimg: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  btext: {
    color: '#fff',
    fontFamily: 'Aclonica-Regular',
    fontSize: 30,
    width: 180,
    textAlign: 'center',
    letterSpacing: 1,
  },
  quotecont: {
    marginTop: 50,
    marginHorizontal: 20,
  },
  quote: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Aclonica-Regular',
  },
  btncont: {
    flexDirection: 'row',
    marginTop: 50,
  },
  btn1: {
    backgroundColor: 'white',
    marginRight: 40,
    padding: 10,
    borderRadius: 10,
  },
  btn1text: {
    fontFamily: 'Aclonica-Regular',
    fontSize: 20,
  },
  btn2: {
    backgroundColor: '#363534',
    padding: 10,
    borderRadius: 10,
  },
  btn2text: {
    fontFamily: 'Aclonica-Regular',
    fontSize: 20,
    color: 'white',
  },
  
  // Login.tsx Styles
  container2: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  login: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Aclonica-Regular',
    marginLeft: 45,
    marginTop: 10,
  },
  inputs: {
    marginTop: 30,
    marginLeft: 40,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
    height: 50,
    paddingHorizontal: 10,
  },
  inputField: {
    flex: 1,
    fontSize: 18,
    color: 'black',
    fontFamily: 'Aclonica-Regular',
    marginLeft: 10,
  },
  inputIcon: {
    width: 20,
    height: 20,
  },
  errortext: {
    color: 'red',
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 5,
  },
  fp: {
    color: '#11f2ec',
    fontSize: 16,
    fontFamily: 'Aclonica-Regular',
    marginLeft:45
  },
  buttoncont:{

  },
  button1: {
    backgroundColor: 'white',
    width: 100,
    height: 40,
    marginLeft: 40,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  buttontext: {
    fontFamily: 'Aclonica-Regular',
    fontSize: 22,
  },
  redirect: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Aclonica-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
  signupLink: {
    color: '#11f2ec',
    textDecorationLine: 'underline',
  },
  
  // Signup.tsx Styles
  container3: {
    flexGrow: 1,
    backgroundColor: '#0F172A',
    paddingBottom: 40,
  },
  genderContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  genderLabel: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Aclonica-Regular',
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioOuterCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#11f2ec',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  radioInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#11f2ec',
  },
  radioSelected: {
    borderColor: '#11f2ec',
  },
  radioLabel: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Aclonica-Regular',
  },

  //Home.tsx
  container4: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  homeheader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#8a2be2', 
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 12,
  },
  headerimg: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  innerheader: {
    flexDirection: 'column',
  },
  header1: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Aclonica-Regular',
  },
  belowheader1: {
    color: '#d3d3d3',
    fontSize: 16,
    fontFamily: 'Aclonica-Regular',
  },
  vline: {
    width: '90%',
    height: 1.5,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignSelf: 'center',
    marginTop: 12,
  },
  targetview: {
    width: '92%',
    alignSelf: 'center',
    marginTop: 15,
  },
  targetbox: {
    width: '100%',
    height: 200, 
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.12)', 
    borderWidth: 1.8,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:20,
    paddingHorizontal: 12,
    width: '100%', 
    marginBottom: 10,
  },
  mytarget: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Aclonica-Regular',
    
  },
  icon: {
    width: 22,
    height: 22,
    tintColor: 'white',
    marginLeft:5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 12,
  },
  circleGradient: {
    borderRadius: 75,
    padding: 4, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  circleNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Aclonica-Regular',
  },

  circleText: {
    fontSize: 15,
    color: '#d3d3d3',
    fontFamily: 'Aclonica-Regular',
  },

  metrics: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 40,
    marginTop:30
  },

  menuItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },

  divider: {
    backgroundColor: '#bbb',
  },

  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 20,
  },

  metricCard: {
    width: 150,
    height: 150,
    borderRadius: 15,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', 
  },

  metricTitle: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Aclonica-Regular',
  },
  
  metricValue: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'Aclonica-Regular',
  },
  
  metricUnit: {
    fontSize: 14,
    color: 'white',
    fontFamily:'Aclonica-Regular'
  },

  metricIcon: {
    width: 50,
    height: 50,
    marginTop: 10,
    resizeMode: 'contain',
  },

  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: '#FF5C5C',
    borderRadius: 10,
    
    
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily:'Aclonica-Regular'
  },


  //RunnerMode.tsx
  container5: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  speedContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom:30
  },
  speedCircle: {
    width: 165,
    height: 165,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  runningIcon: {
    width: 55,
    height: 55,
    marginBottom: 5,
  },
  speedText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Aclonica-Regular',
    marginTop: 5,
  },
  innerSpeedCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -35,
    borderWidth: 2,
    borderColor: '#ff5722',
    elevation: 8,
  },
  speedValue: {
    fontSize: 22,
    color: '#ff5722',
    fontFamily: 'Aclonica-Regular',
  },
  speedUnit: {
    fontSize: 11,
    color: '#ff5722',
    fontFamily: 'Aclonica-Regular',
  },
  metricsContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  glassBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: '45%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  metricLabel: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'Aclonica-Regular',
    textAlign: 'center',
  },
  metricValue1: {
    fontSize: 24,
    fontFamily: 'Aclonica-Regular',
    color: '#FFEB3B',
    marginTop: 5,
  },
  metricUnit1: {
    fontSize: 12,
    color: 'gray',
    fontFamily: 'Aclonica-Regular',
  },
  distanceContainer: {
    alignItems: 'center',
    marginTop: 40,
  },


  //LiveTracking
  container6:{
    flex: 1,
    backgroundColor: '#0F172A',
    paddingBottom:400,
  },
  mapContainer: {
    flex: 1,
    height: 400,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },

  //Profile.tsx
  container7: {
    flex: 1,
    backgroundColor: '#0A192F',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  profileHeading: {
    fontSize: 30,
    fontFamily: 'Aclonica-Regular',
    color: '#E5E7EB',
    textAlign: 'center',
    marginBottom: 25,
  },
  profileCard: {
    alignSelf: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.85)',
    padding: 25,
    borderRadius: 15,
    width: '100%',
    maxWidth: 420,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
  },
  profileDetails: {
    width: '100%',
  },
  profileText: {
    fontSize: 18,
    fontFamily: 'Aclonica-Regular',
    color: '#E0E0E0',
    marginVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingBottom: 6,
  },
  boldText: {
    fontFamily: 'Aclonica-Regular',
    color: '#F8FAFC',
  },

  inputcont: {
    backgroundColor: 'rgba(30, 41, 59, 0.85)',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  theading: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Aclonica-Regular',
    textAlign: 'center',
    marginBottom: 15,
  },
  inputwrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  tinput: {
    
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'white',  
  },
  buttoncont1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  tbutton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  ttext: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Aclonica-Regular',
  },
  logoutContainer: {
    marginTop: 30, 
    alignItems: 'center',
  },
  
  logoutButton: {
    backgroundColor: '#E63946',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
  },
  
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

});


export default styles;