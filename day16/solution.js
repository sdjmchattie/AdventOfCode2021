import { readLines } from '../lib/file-access.js';

class Packet {
  constructor(binary) {
    this._binary = binary;
    this._truncate();
  }
  _binVal(from, to) {
    return parseInt(this._binary.slice(from, to), 2);
  }
  _truncate() {
    if (this.type() === 4) {
      this._binary = this._binary.slice(0, this.body().length * 1.25 + 6);
    } else if (this.lengthType() === 0) {
      this._binary = this._binary.slice(0, this.body().length + 22);
    } else {
      this._binary = this._binary.slice(0, this.body().length + 18);
    }
  }
  version() {
    return this._binVal(0, 3);
  }
  versionSum() {
    return (
      this.version() +
      this.innerPackets().reduce((acc, pkt) => acc + pkt.versionSum(), 0)
    );
  }
  type() {
    return this._binVal(3, 6);
  }
  lengthType() {
    if (this.type() === 4) {
      // Type 4 don't have a length type.
      return;
    }

    return this._binVal(6, 7);
  }
  bitCount() {
    if (this.lengthType !== 0) {
      // Only length_type zero have a bit count.
      return;
    }
  }
  length() {
    const _ = this.body(); // Causes the binary to be correct truncated.
    return this._binary.length;
  }
  _extractBitsFromGroups(allBits) {
    var bits = '';
    var stop = false;
    var remainingBits = allBits;

    while (!stop) {
      const nextBits = remainingBits.slice(0, 5);
      bits += nextBits.slice(1);

      if (nextBits[0] === '0') {
        stop = true;
      }

      remainingBits = remainingBits.slice(5);
    }

    return bits;
  }
  body() {
    if (!this._body) {
      if (this.type() === 4) {
        // Read the rest of the packet until the terminator bit is found.
        this._body = this._extractBitsFromGroups(this._binary.slice(6));
      } else {
        this._body = this.innerPackets().reduce(
          (acc, pkt) => acc + pkt._binary,
          ''
        );
      }
    }

    return this._body;
  }
  value() {
    switch (this.type()) {
      case 0:
        // Sum packet
        return this.innerPackets().reduce((a, p) => a + p.value(), 0);
      case 1:
        // Product packet
        return this.innerPackets().reduce((a, p) => a * p.value(), 1);
      case 2:
        // Minimum packet
        return this.innerPackets().reduce(
          (a, p) => Math.min(a, p.value()),
          Infinity
        );
      case 3:
        // Maximum packet
        return this.innerPackets().reduce((a, p) => Math.max(a, p.value()), 0);
      case 4:
        // Literal value packet
        return parseInt(this.body(), 2);
      case 5:
        // Greater than packet
        return this.innerPackets()[0].value() > this.innerPackets()[1].value()
          ? 1
          : 0;
      case 6:
        // Less than packet
        return this.innerPackets()[0].value() < this.innerPackets()[1].value()
          ? 1
          : 0;
      case 7:
        // Equal to packet
        return this.innerPackets()[0].value() === this.innerPackets()[1].value()
          ? 1
          : 0;
    }
  }
  innerPackets() {
    if (!this._innerPackets) {
      this._innerPackets = [];

      if (this.type() !== 4) {
        if (this.lengthType() === 0) {
          var body = this._binary.slice(22, 22 + this._binVal(7, 22));
          while (body.length > 0) {
            const nextPacket = new Packet(body);
            body = body.slice(nextPacket.length());
            this._innerPackets.push(nextPacket);
          }
        } else {
          const packetCount = this._binVal(7, 18);
          var binary = this._binary.slice(18);
          for (var i = 0; i < packetCount; i++) {
            const nextPacket = new Packet(binary);
            binary = binary.slice(nextPacket.length());
            this._innerPackets.push(nextPacket);
          }
        }
      }
    }

    return this._innerPackets;
  }
}

const rawInput = readLines('./day16/input.txt');
const binInput = rawInput[0]
  .split('')
  .reduce(
    (acc, n) => acc + ('0000' + parseInt(n, 16).toString(2)).slice(-4),
    ''
  );

const packet = new Packet(binInput);

console.log('Part 1:  ' + packet.versionSum());

console.log('Part 2:  ' + packet.value());
