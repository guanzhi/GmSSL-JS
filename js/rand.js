/*
 *  Copyright 2014-2022 The GmSSL Project. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the License); you may
 *  not use this file except in compliance with the License.
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 */


function rand_bytes(data, len) {
	var buf = new Uint8Array(len);
	window.crypto.getRandomValues(buf);
	for (var i = 0; i < len; i++) {
		data[i] = buf[i];
		buf[i] = 0;
	}
	delete buf;
}

function bn_rand_range(a, n) {
	var t = new Uint16Array(16);
	do {
		window.crypto.getRandomValues(t);
	} while (bn_cmp(t, n) >= 0);
	bn_copy(a, t);
	bn_free(t);
}
