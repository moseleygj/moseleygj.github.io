#!/bin/bash

# Prompt user for host mask
read -p "Enter the host mask (e.g., 192.168.1.0/24): " hostmask

# Use default if blank
default_mask="192.168.1.0/24"
if [[ -z "$hostmask" ]]; then
    echo "No input detected. Using default: $default_mask"
    hostmask="$default_mask"
fi

# Basic error checking (IPv4/CIDR format)
if ! [[ "$hostmask" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}/[0-9]{1,2}$ ]]; then
    echo "❌ Invalid host mask format. Please use CIDR notation like 192.168.1.0/24."
    exit 1
fi

echo "🔍 Scanning network: $hostmask ..."
sudo nmap "$hostmask" > scan.txt

echo "✅ Scan complete. Output saved to scan.txt"


sed -e '/Host is up/d' \
    -e '/Not shown/d' \
    -e '/^[[:space:]]*$/s/^.*$/\n==========================================================================\n/' \
    -e 's/Nmap scan report for/NODE:/g' \
    -e 's/ssh/🖥️  SSH/g' \
    -e 's/http/🌐 HTTP/g' \
    -e 's/ftp/📁 FTP/g' \
    -e 's/smb/🖧 SMB/g' \
    -e 's/printer/🖨️ Printer/g' \
    -e 's/jetdirect/🖨️ JetDirect/g' scan.txt | \
awk '
BEGIN {
  bold = "\033[1m"
  blue = "\033[34m"
  reset = "\033[0m"
}
{
  if ($0 ~ /^NODE:/) {
    print bold blue "🧿 " $0 reset
  } else {
    print
  }
}'
