import re
from collections import defaultdict
import subprocess
subprocess.run("journalctl _COMM=sshd >ssh_log.txt", shell=True)

def show_failed_logins():
    subprocess.run("sudo lastb", shell=True)


#def last_failed_login():
#    print("Showing last failed login...")

def accepted_logins():
    subprocess.run("last", shell=True)

def block_ip():
    ip=input("Enter an IP to BAN: ").strip()

    print("Blocking an IP...")
    subprocess("sudo iptables -A INPUT -s 1.2.3.4 -p tcp --dport 22 -j DROP", shell=True)
    
    command = f"sudo iptables -A INPUT -s {ip} -p tcp --dport 22 -j DROP"
    print(f"Blocking IP {ip} from accessing SSH...")
    subprocess.run(command, shell=True, check=True)
    print(f"✅ IP {ip} has been blocked.")

def ssh_failed_login():
    ip_counts_by_day = defaultdict(lambda: defaultdict(int))

    with open("ssh_log.txt") as f:
        for line in f:
            if "drop" in line.lower():
                parts = line.strip().split()
                try:
                    day = f"{parts[0]} {parts[1]}"  # e.g., 'Mar 24'
                    # Search for IP inside brackets
                    match = re.search(r"\b(\d{1,3}(?:\.\d{1,3}){3})\b", line)
                    if match:
                        ip = match.group(1)  # e.g., '60.172.52.101'
                        ip_counts_by_day[day][ip] += 1
                    else:
                        print("IP not found in line:", line)
                except IndexError:
                    print("Malformed line:", line)

    # Display counts by day
    for day, ips in ip_counts_by_day.items():
        print(f"\n📅 {day}")
        for ip, count in ips.items():
            print(f"  📍 {ip} ➜ {count} occurrence(s)")



def fail2ban_status():
    print("Checking Fail2Ban status...")

# Menu map
menu_actions = {
    1: show_failed_logins,
#    2: last_failed_login,
    3: accepted_logins,
    4: block_ip,
    5: fail2ban_status,
    2: ssh_failed_login
}

while True:
    print("\n--- Security Script Menu ---")
    print("1 - ⛏️ Show Failed SSH attempts on specific Accounts")
    print("2 - 🧮 Show # of failed SSH login")
#    print("2 -  Last failed login")
    print("3 - ✅ Accepted Logins")
    print("4 - ⛔ Block IP")
    print("5 - 🛡️ Fail2Ban")


    try:
        option = int(input("Select an option: "))
        if option in menu_actions:
            menu_actions[option]()  # Call the corresponding function
            break  # Remove this break if you want the menu to repeat after each action
        else:
            print("Error: Number out of range. Try again.\n")
    except ValueError:
        print("Error: Please enter a number. Try again.\n")
