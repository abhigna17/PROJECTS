// UserProfile.java
public class UserProfile {
    private String username;
    private String fullName;
    private String email;
    private String college;

    public UserProfile(String username, String fullName, String email, String college) {
        this.username = username;
        this.fullName = fullName;
        this.email = email;
        this.college = college;
    }

    // Getters and setters
    public String getUsername() { return username; }
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }
    public String getCollege() { return college; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public void setEmail(String email) { this.email = email; }
    public void setCollege(String college) { this.college = college; }
}
