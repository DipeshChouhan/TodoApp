public class Main {
    public static void main(String[] args) {

        String gr = "";
        String ll = "";
        String d = "";
        String in1 = "*A:GR44R KP 58264 15496#*A:25.435834,78.593772#*A:FS1234,AM5678,HL89,EL7894,EB89#";
        String in2 = "A:FS1234,AM5678,HL89,EL7894,EB89";
        in1 = in1.replace("*", "");
        in1 = in1.replace("#", "");
        char name = in1.charAt(0);

        in1 = in2;
        int i = 0;
        while(i < in1.length()) {
            if (in1.charAt(i) == ':') {
                if (in1.charAt(i + 1) == 'G') {
                    char prev = in1.charAt(i - 1);
                    i += 3;
                    while(i < in1.length()) {
                        if (in1.charAt(i) == prev) {
                            break;
                        }
                        gr += in1.charAt(i);
                        ++i;

                    }
                } else if (in1.charAt(i + 1) == '2') {
                    char prev = in1.charAt(i - 1);
                    i += 1;
                    while(i < in1.length()) {
                        if (in1.charAt(i) == prev) {
                            break;
                        }
                        ll += in1.charAt(i);
                        i++;
                    }

               } else {

                    char prev = in1.charAt(i - 1);
                    i += 1;
                    while(i < in1.length()) {
                        if (in1.charAt(i) == prev && in1.charAt(i + 1) == ':') {
                            break;
                        }
                        d += in1.charAt(i);
                        i++;
                    }
                }
            }
            i++;
        }
        System.out.println(d);
        System.out.println(ll);
        System.out.println(gr);
        System.out.println("Hello world!");
    }
}