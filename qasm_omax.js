/*
 * Copyright 2021 the original author or authors of quantum-music-playground Ableton Live plugin :
 * kaleb-hutchy, JJavaFXpert James Weaver, omarcostahamido OCH
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * Modified by Josep Manuel Berenguer. 
 * 1. Draw() and sketch() functions have 
 * been erased, in order to allow use as [[js qasm_omax.js]] in any maxpatcher. 
 * Original file name was qasm_pad.js. Current name is qasm_omax.js. 
 *
 * 2. Modifies createQasmFromGrid() and renames it to createQasm() in order to 
 * create a QASM code depending only on  8 qbit inputs and a random created oracle 
 * by function qasmGenOracle()
 * 
 * 3. Introduces qasmGenOracle() and selectGate() functions to create the oracle. 
*/

var CircuitNodeTypes = {
  EMPTY: -1,
  HAND: 0,
  ERASE: 1,
  H: 8,
  SWAP: 9,
  BARRIER: 10,
  CTRL: 11, // "control" part of multi-qubit gate
  ANTI_CTRL: 12, // "anti-control" part of multi-qubit gate
  TRACE: 13, // In the path between a gate part and a "control" or "swap" part
  MEASURE_Z: 14,
  IDEN: 15,

  CTRL_X: 21, // X gate that is associated with control qubit(s)

  RX_0: 30, // Rx
  RX_1: 31, // Rx pi/8
  RX_2: 32, // Rx pi/4
  RX_3: 33, // Rx 3pi/8
  RX_4: 34, // Rx pi/2
  RX_5: 35, // Rx 5pi/8
  RX_6: 36, // Rx 3pi/4
  RX_7: 37, // Rx 7pi/8
  RX_8: 38, // Rx pi (X)
  RX_9: 39, // Rx 9pi/8
  RX_10: 40, // Rx 5pi/4
  RX_11: 41, // Rx 11pi/8
  RX_12: 42, // Rx 3pi/2
  RX_13: 43, // Rx 13pi/8
  RX_14: 44, // Rx 7pi/4
  RX_15: 45, // Rx 15pi/8

  RY_0: 50, // Ry
  RY_1: 51, // Ry pi/8
  RY_2: 52, // Ry pi/4
  RY_3: 53, // Ry 3pi/8
  RY_4: 54, // Ry pi/2
  RY_5: 55, // Ry 5pi/8
  RY_6: 56, // Ry 3pi/4
  RY_7: 57, // Ry 7pi/8
  RY_8: 58, // Ry pi (Y)
  RY_9: 59, // Ry 9pi/8
  RY_10: 60, // Ry 5pi/4
  RY_11: 61, // Ry 11pi/8
  RY_12: 62, // Ry 3pi/2
  RY_13: 63, // Ry 13pi/8
  RY_14: 64, // Ry 7pi/4
  RY_15: 65, // Ry 15pi/8

  PHASE_0: 70, // Phase
  PHASE_1: 71, // Phase pi/8
  PHASE_2: 72, // Phase pi/4 (T)
  PHASE_3: 73, // Phase 3pi/8
  PHASE_4: 74, // Phase pi/2 (S)
  PHASE_5: 75, // Phase 5pi/8
  PHASE_6: 76, // Phase 3pi/4
  PHASE_7: 77, // Phase 7pi/8
  PHASE_8: 78, // Phase pi (Z)
  PHASE_9: 79, // Phase 9pi/8
  PHASE_10: 80, // Phase 5pi/4
  PHASE_11: 81, // Phase 11pi/8
  PHASE_12: 82, // Phase 3pi/2 (Sdg)
  PHASE_13: 83, // Phase 13pi/8
  PHASE_14: 84, // Phase 7pi/4 (Tdg)
  PHASE_15: 85, // Phase 15pi/8

  QFT: 90 // QFT
};

/**
 * Analyze input and create QASM code, and sends it to outlet to be
 * processed by mycro-qiskit
 */

var myval=0;

if (jsarguments.length>1)
	myval = jsarguments[1];


function bang() {
	createQasm(myval);
}


function list()
{
	var a = arrayfromargs(arguments);
	//post("received list " + a + "\n");
	myval = a;
	bang();
}

/*
 * createQasm() vectorizes 8 external float informations as x rotations in qbits 0 to 7, 
 * creates a random oracle, concatenates them and sends to outlet 0 to be processed by  
 * micro_qiskit_omax.js
 *
*/
function createQasm(preInput) {

  var numCircuitWires = 8;
  var qasmHeaderStr = 'qreg q[' + numCircuitWires + '];' + ' creg c[' + numCircuitWires + '];';
  var qasmInputStr = '';
  var qasmMeasure ='';

  var qasmOutputStr='';

  var qasmOracle ='';

  //cx q[0],q[1]; cx q[2],q[3]; cx q[4],q[5]; cx q[6],q[7]; 
  //ccx q[0],q[1],q[2]; sxdg q[2]; ccx q[2],q[3],q[4]; 
  //sxdg q[4]; ccx q[4],q[5],q[6]; 
  //barrier q[0],q[1],q[2],q[3],q[4],q[5],q[6],q[7]; 
  //h q[0]; h q[1]; h q[2]; h q[3]; h q[4]; h q[5]; h q[6]; h q[7];';

  //vectorize all inputs as rotations in x of any qbits. 
  qasmInputStr = 'rx('+preInput[0]+') q[0];' + 'rx('+preInput[1]+') q[1];' + 'rx('+preInput[2]+') q[2];'+ 'rx('+preInput[3]+') q[3];'+ 'rx('+preInput[4]+') q[4];'
  + 'rx('+preInput[5]+') q[5];'+ 'rx('+preInput[6]+') q[6];'+ 'rx('+preInput[7]+') q[7];';

  qasmOracle = qasmGenOracle();
  //post('oracle'+qasmOracle);

  qasmOutputStr = qasmInputStr + qasmOracle;

  //refreshControllerPads();
  qasm = qasmHeaderStr + qasmOutputStr; 

  // Send QASM code to outlet
  outlet(0, 'svsim', qasm);
}


/*
 * qasmGenOracle() generates a random oracle giving #cols quantum gates to each qbit
 *
*/
function qasmGenOracle(){
	
	var outGenOracle = '';	
	var cols = 1 + Math.floor((Math.random()*10));
	for (i=0;i<cols;i++)
		for (j=0;j<8;j++)
			outGenOracle += selectGate(j);
					
	//post('cols =', cols);
	return (outGenOracle);
	
}

/*
 * selectGate() returns a random gate for the qbit provided in the input. Id
 * selected gate requires a rotation, it is also radomly choosed in range [0-2PI]
*/

function selectGate(wqbit){
	var gateType = Math.floor(Math.random()*20);
	switch (gateType){
	case 0:
	 return('');
	break;
	case 1:
		return('x q['+wqbit+'];');
	break;
	case 2:
		while ((j=Math.floor(Math.random()*8)) == wqbit);
		return('cx q['+wqbit+'], q['+j+'];');
	break;
	case 3:
		while ((j=Math.floor(Math.random()*8)) == wqbit);
		while (((k=Math.floor(Math.random()*8)) == wqbit) && (k!=j));
		return('ccx q['+wqbit+'], q['+j+'], q['+k+'];');
	break;
	case 4:
		return('t q['+wqbit+'];');
	break;
	case 5:
		return('s q['+wqbit+'];');
	break;
	case 6:
		return('z q['+wqbit+'];');
	break;
	case 7:
		return('tdg q['+wqbit+'];');
	break;
	case 8:
		return('sdg q['+wqbit+'];');
	break;
	case 9:
		return('p('+Math.random()* 6.28318502+') q['+wqbit+'];');
	break;
	case 10:
		return('rz('+Math.random()* 6.28318502+') q['+wqbit+'];');
	break;
	case 11:
		return('sx q['+wqbit+'];');
	break;
	case 12:
		return('sxdg q['+wqbit+'];');
	break;
	case 13:
		return('y q['+wqbit+'];');
	break;
	case 14:
		return('rx('+ Math.random()* 6.28318502 +') q['+wqbit+'];');
	break;
	case 15:
		return('ry('+ Math.random()* 6.28318502 +') q['+wqbit+'];');
	break;
	case 16:
		return('u('+ Math.random()* 6.28318502 +',' + Math.random()* 6.28318502 + ',' + Math.random()* 6.28318502 + ') q['+wqbit+'];');
	case 17:
		while ((j=Math.floor(Math.random()*8)) == wqbit);
		return('rxx('+ Math.random()* 6.28318502 + ') q['+wqbit+'], q['+j+'];');	
	break;
	case 18:
		while ((j=Math.floor(Math.random()*8)) == wqbit);
		return('rzz('+Math.random()* 6.28318502 + ') q['+wqbit+'], q['+j+'];');
    break;
  case 19:  
    return('h q['+wqbit+'];');
	break;			
	default:
	break;
	}
}
