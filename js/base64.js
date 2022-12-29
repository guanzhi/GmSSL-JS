/*
 *  Copyright 2014-2022 The GmSSL Project. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the License); you may
 *  not use this file except in compliance with the License.
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 */


const BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function base64_encode(bytes) {
	var i = 0; j = 0;
	var append = bytes.length % 3 > 0 ? 3 - bytes.length % 3 : 0;
	for (i = 0; i < append; i++) {
		bytes[bytes.length] = 0;
	}
	var b64 = "";
	for (i = 0; j < bytes.length; j += 3) {
		if (j > 0 && j % 57 == 0) {
			b64 += '\n';
		}
		b64 += BASE64_MAP[bytes[j] >> 2]
			+ BASE64_MAP[(bytes[j] & 3) << 4 | bytes[j+1] >> 4]
			+ BASE64_MAP[(bytes[j+1] & 15) << 2 | bytes[j+2] >> 6]
			+ BASE64_MAP[bytes[j+2] & 63];
	}
	for (i = 0; i < append; i++) {
		b64 += '=';
	}
	return b64;
}

function base64_decode(input) {
	var i = 0, j = 0;
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	var append = input.length % 4;
	if (append > 2) {
		return null;
	}
	for (i = 0; i < append; i++) {
		if (input.charAt(input.length - i - 1) != '=') {
			return null;
		}
	}
	var output = new Array((input.length - append) * 3 / 4);
	var enc1, enc2, enc3, enc4;
	for (i = 0, j = 0; j < output.length;) {
		enc1 = BASE64_MAP.indexOf(input.charAt(i++));
		enc2 = BASE64_MAP.indexOf(input.charAt(i++));
		enc3 = BASE64_MAP.indexOf(input.charAt(i++));
		enc4 = BASE64_MAP.indexOf(input.charAt(i++));
		output[j++] = (enc1 << 2) | (enc2 >> 4);
		output[j++] = ((enc2 & 15) << 4) | (enc3 >> 2);
		output[j++] = ((enc3 & 3) << 6) | enc4;
	}
	for (i = 0; i < append; i++) {
		if (output.pop() != 0) {
			return null;
		}
	}
	return output;
}

function base64_test() {
	var bin = [1, 2, 3, 4, 5];
	var b64 = base64_encode(bin);
	var buf = base64_decode(b64);
	console.log(b64);
	console.log(buf);
}
