import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";

import * as process from 'process'

import Button from "@mui/material/Button";
import { model } from "@tensorflow/tfjs";

import { InferenceSession, } from "onnxruntime-web";

import * as ort from 'onnxruntime-web';
import * as fs from 'fs';

async function Jawaban_Model() {
  // const pathing = require('path')
  // const folderPath = process.cwd();
  // const fs = require('fs');
  // const files = fs.readdirSync(folderPath);
  // const currentDirectory = process.cwd();
  // fs.readdir(currentDirectory, (err: string, files: Array<string>) => {
  //   if (err) {
  //     console.error('Error:', err);
  //     return;
  //   }
  //   console.log('Contents of the current directory:');

  //   files.forEach((file: string) => {
  //     console.log(file);
  //   });
  // });

  // console.log(ort.InferenceSession.create('dtc_cv.onnx'))
  const options = {
    executionProviders: ['wasm']
  };
  console.log("session")

  // ort.env.wasm.wasmPaths = '../node_modules/onnxruntime - web/dist/'
  const session = await ort.InferenceSession.create('dtc_cv.onnx', options);
  console.log("session 1")
  console.log(session)

  // console.log(session1)
}

export default function Home() {
  // Jawaban_Model();
  return (
    <form className="rounded-3xl m-4 p-4 bg-emerald-500" action="/jalankan">
      <div className="text-center p-4 size">Form</div>
      <div className="flex flex-row">
        <div className="basis-1/2">
          <div>
            <div className="my-4">
              <FormLabel>Data 1 : </FormLabel>
              <input
                type="number"
                className="text-black rounded-xl p-4"
                name="data_1"
              />
            </div>
            <div className="my-4">
              <FormLabel>Data 3 : </FormLabel>
              <input
                type="number"
                className="text-black rounded-xl p-4"
                name="data_3"
              />
            </div>
            <div className="my-4">
              <FormLabel>Data 5 : </FormLabel>
              <input
                type="number"
                className="text-black rounded-xl p-4"
                name="data_5"
              />
            </div>
            <div className="my-4">
              <FormLabel>Data 7 : </FormLabel>
              <input
                type="number"
                className="text-black rounded-xl p-4"
                name="data_7"
              />
            </div>
          </div>
        </div>
        <div className="basis-1/2">
          <div>
            <div className="my-4">
              <FormLabel>Data 2 : </FormLabel>
              <input
                type="number"
                className="text-black rounded-xl p-4"
                name="data_2"
              />
            </div>
            <div className="my-4">
              <FormLabel>Data 4 : </FormLabel>
              <input
                type="number"
                className="text-black rounded-xl p-4"
                name="data_4"
              />
            </div>
            <div className="my-4">
              <FormLabel>Data 6 : </FormLabel>
              <input
                type="number"
                className="text-black rounded-xl p-4"
                name="data_6"
              />
            </div>
            <div className="text-center">
              <button className="rounded-xl p-4 bg-cyan-600 text-center">
                Rizal Mujahiddan
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
