// Database.java
import java.util.*;

public class Database {
    private static Map<String, String> users = new HashMap<>();
    private static Map<String, UserProfile> profiles = new HashMap<>();

    static {
        // Add some default users
        users.put("admin", "admin123");
    }

    public static boolean validateUser(String username, String password) {
        return users.containsKey(username) && users.get(username).equals(password);
    }

    public static boolean registerUser(String username, String password) {
        if (users.containsKey(username)) {
            return false;
        }
        users.put(username, password);
        profiles.put(username, new UserProfile(username, "", "", ""));
        return true;
    }

    public static boolean updatePassword(String username, String newPassword) {
        if (users.containsKey(username)) {
            users.put(username, newPassword);
            return true;
        }
        return false;
    }

    public static UserProfile getProfile(String username) {
        return profiles.get(username);
    }

    public static void updateProfile(UserProfile profile) {
        profiles.put(profile.getUsername(), profile);
    }
}
